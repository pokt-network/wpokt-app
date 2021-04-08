import React from 'react';

import { TimeRemaining } from 'utils/types';

import dayjs from 'dayjs';
import gql from 'graphql-tag';
import { Client } from 'urql';
import { DocumentNode } from 'graphql';

import { getTimeRemaining } from 'utils/helpers';
import { WPOKT_SUBGRAPH_URL } from 'constants/index';
import { BigNumber } from 'bignumber.js';

const RETRY_EVERY = 3000;
const DAYS_IN_MONTH = new BigNumber(dayjs().daysInMonth());
const ZERO = new BigNumber(0);

const graphqlClient = new Client({ url: WPOKT_SUBGRAPH_URL ?? '' });

const FARM_STATS_QUERY: DocumentNode = gql`
  query FARM_STATS($farmAddress: ID!) {
    tokenGeysers(where: { id: $farmAddress }) {
      apr
      tvl
      staked
      durationSec
      bonusPeriodSec
      createdTimestamp
      unlockedRewards
      lockedRewards
      totalUnlockedRewards
    }
  }
`;

type BigNumberish = BigNumber.Value;

type FarmStatsResponse = {
  apr: BigNumberish;
  tvl: BigNumberish;
  staked: BigNumberish;
  durationSec: number;
  bonusPeriodSec: number;
  createdTimestamp: number;
  unlockedRewards: BigNumberish;
  lockedRewards: BigNumberish;
  totalUnlockedRewards: BigNumberish;
};

type FarmStatsReturnType = {
  apr: BigNumber;
  tvl: BigNumber;
  maxRelays: BigNumber;
  farmUsage: BigNumber;
  lockedRewards: BigNumber;
  unlockedRewards: BigNumber;
  totalStaked: BigNumber;
  totalRewards: BigNumber;
  totalUnlockedRewards: BigNumber;
  rewardUnlockRate: BigNumber;
  timeRemaining?: TimeRemaining;
  totalTime?: number;
};

export function useFarmStats(farmAddress: string): FarmStatsReturnType {
  const [apr, setApr] = React.useState(ZERO);
  const [tvl, setTvl] = React.useState(ZERO);
  const [totalStaked, setTotalStaked] = React.useState(ZERO);
  const [unlockedRewards, setUnlockedRewards] = React.useState(ZERO);
  const [lockedRewards, setLockedRewards] = React.useState(ZERO);
  const [totalRewards, setTotalRewards] = React.useState(ZERO);
  const [totalUnlockedRewards, setTotalUnlockedRewards] = React.useState(ZERO);
  const [rewardUnlockRate, setRewardUnlockRate] = React.useState(ZERO);
  const [timeRemaining, setTimeRemaining] = React.useState<TimeRemaining>();
  const [totalTime, setTotalTime] = React.useState<number>(0);

  const [farmUsage, setFarmUsage] = React.useState(ZERO);
  const [maxRelays, setMaxRelays] = React.useState(ZERO);

  React.useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout>;

    async function fetchFarmStats() {
      try {
        const result = await graphqlClient.query(FARM_STATS_QUERY, { farmAddress }).toPromise();
        const farmGoalRelays = new BigNumber(15000000);

        if (!result?.data) {
          return;
        }

        const [
          {
            apr: rawApr,
            tvl: rawTvl,
            staked: rawStaked,
            unlockedRewards: rawUnlockedRewards,
            lockedRewards: rawLockedRewards,
            totalUnlockedRewards: rawTotalUnlockedRewards,
            durationSec,
            createdTimestamp,
          },
        ]: [
          // eslint-disable-next-line prettier/prettier
          FarmStatsResponse
        ] = result.data.tokenGeysers;

        const parsedApr = new BigNumber(rawApr);
        const parsedTvl = new BigNumber(rawTvl);
        const parsedStaked = new BigNumber(rawStaked);
        const parsedLockedRewards = new BigNumber(rawLockedRewards);
        const parsedUnlockedRewards = new BigNumber(rawUnlockedRewards);

        const parsedTotalUnlockedRewards = new BigNumber(rawTotalUnlockedRewards);
        const parsedTotalRewards = parsedUnlockedRewards.plus(parsedLockedRewards);

        const unlockRate = parsedTotalUnlockedRewards.div(DAYS_IN_MONTH);

        const today = dayjs();

        // Calculate farm end date based on the bonus period (at this time, all rewards are unlocked)
        const farmEndDateSeconds = +createdTimestamp + +durationSec;
        const farmEndDate = dayjs.unix(farmEndDateSeconds);
        const farmTimeLeft = farmEndDate.diff(today, 'seconds');
        const timeRemaining: TimeRemaining = getTimeRemaining(farmTimeLeft);
        const totalTime: number = +durationSec;

        const parsedMaxRelays = parsedStaked.times(new BigNumber(40));
        const parsedFarmUsage = parsedMaxRelays.div(farmGoalRelays).times(new BigNumber(100));

        if (!cancelled) {
          setApr(parsedApr);
          setTvl(parsedTvl);
          setMaxRelays(parsedMaxRelays);
          setFarmUsage(parsedFarmUsage);
          setUnlockedRewards(parsedUnlockedRewards);
          setLockedRewards(parsedLockedRewards);
          setTotalRewards(parsedTotalRewards);
          setTotalUnlockedRewards(parsedTotalUnlockedRewards);
          setTotalStaked(parsedStaked);
          setTimeRemaining(timeRemaining);
          setTotalTime(totalTime);
          setRewardUnlockRate(unlockRate);
        }
      } catch (err) {
        retryTimer = setTimeout(fetchFarmStats, RETRY_EVERY);
      }
    }

    fetchFarmStats();

    return () => {
      cancelled = true;
      clearTimeout(retryTimer);
    };
  }, [farmAddress]);

  return {
    apr,
    tvl,
    farmUsage,
    maxRelays,
    lockedRewards,
    unlockedRewards,
    totalStaked,
    totalRewards,
    totalUnlockedRewards,
    rewardUnlockRate,
    timeRemaining,
    totalTime,
  };
}
