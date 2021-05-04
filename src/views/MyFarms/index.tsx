import React from 'react';
import { useHistory } from 'react-router-dom';
import { colors } from 'components/theme';

import { ReactComponent as FarmSvg } from 'assets/icons/farm.svg';
import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';

import {
  StyledContentContainer,
  StyledFarmContainer,
  StyledHeader,
  StyledHeaderLeft,
  StyledHeaderRight,
  StyledLine,
  StyledSelectorContainer,
  StyledSmallInfoCardsContainer,
  StyledStakedText,
} from 'views/MyFarms/components';
import { Container, Flex } from 'components/Containers';
import {
  Card,
  InnerCardContainer,
  MediumDepositWithdrawLinks,
  MediumInfoCard,
  MediumStatsFaqLinks,
  SmallInfoCard,
  SmallInfoCardExtraLinks,
} from 'components/Cards';
import Spacer from 'components/Spacer';
import { H1, P2 } from 'components/Typography';

import { TOKEN_GEYSER_ADDRESS, WPOKT_DECIMALS } from 'constants/index';

import { DepositWithdrawalContext } from 'contexts/DepositWithdrawal';
import { Web3Context } from 'contexts/Web3';

import { useFarmStats } from 'hooks/useFarmStats';
import { useUserStats } from 'hooks/useUserStats';

import {
  commifyString,
  formatDaysFromTimestamp,
  formatFillPercentage,
  formatOwnershipShare,
  formatRelays,
} from 'utils';

const MyFarms: React.FC = () => {
  const history = useHistory();
  const { onSetActionType } = React.useContext(DepositWithdrawalContext);
  const { address } = React.useContext(Web3Context);
  const { apr, farmUsage, maxRelays, unlockedRewards, timeLeft, totalTime } = useFarmStats(TOKEN_GEYSER_ADDRESS);
  const { earned, ownershipShare, totalStaked, weightedMultiplier } = useUserStats(
    address ? address : '',
    TOKEN_GEYSER_ADDRESS,
  );
  const [farmSelected, setFarmSelected] = React.useState<boolean>(true);

  const onDepositWithdrawLink = (actionType: 'deposit' | 'withdraw') => {
    onSetActionType(actionType);
    history.push('/');
  };

  return (
    <>
      <Spacer size={'md'} />
      <Card>
        <InnerCardContainer borderBottom={false}>
          <StyledHeader onClick={() => setFarmSelected(!farmSelected)} farmSelected={farmSelected}>
            <StyledHeaderLeft>
              <div id={'farm-title'}>
                <StyledFarmContainer>
                  <FarmSvg />
                </StyledFarmContainer>
                <H1 color={colors.white}>Genesis Farm</H1>
              </div>
            </StyledHeaderLeft>
            <StyledHeaderRight>
              <StyledLine />
              <div id={'estimated-reward'}>
                <P2 color={colors.white}>Total Staked</P2>
                <Flex align={'center'}>
                  <StyledStakedText color={colors.white}>
                    {commifyString(totalStaked.toFixed(WPOKT_DECIMALS))} wPOKT
                  </StyledStakedText>
                  <StyledSelectorContainer farmSelected={farmSelected}>
                    <SelectorSvg />
                  </StyledSelectorContainer>
                </Flex>
              </div>
            </StyledHeaderRight>
          </StyledHeader>
          {farmSelected && (
            <StyledSmallInfoCardsContainer>
              <StyledContentContainer>
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'APR'}
                  statContent={`${commifyString(apr.toFixed(WPOKT_DECIMALS))}%`}
                />
                <SmallInfoCard
                  iconType={'caret'}
                  statTitle={'Multiplier'}
                  statContent={`${weightedMultiplier.toFixed(2)} X`}
                />
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Total Staked'}
                  statContent={`${commifyString(totalStaked.toFixed(2))} wPOKT`}
                />
                <SmallInfoCard
                  iconType={'caret'}
                  statTitle={'Max Relays/Day'}
                  statContent={`${formatRelays(maxRelays)} M`}
                />
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Farm Usage'}
                  statContent={`${farmUsage.toFixed(2)}%`}
                />
                <SmallInfoCard iconType={'question'} statTitle={'Supported Apps'} statContent={'0'} />
                {/* Note: If this is wPOKT, why do we have to fix it to 2 decimals? Subgraph? */}
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Rewards unlocked'}
                  statContent={`${commifyString(unlockedRewards.toFixed(2))} wPOKT`}
                />
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Farm ownership'}
                  statContent={`${formatOwnershipShare(ownershipShare)}%`}
                />
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Time Left'}
                  statContent={`${formatDaysFromTimestamp(timeLeft)} Days`}
                  statFill={formatFillPercentage(timeLeft, totalTime)}
                />
                <SmallInfoCardExtraLinks />
              </StyledContentContainer>
              <div>
                <MediumInfoCard
                  amount={`${commifyString(earned.toFixed(WPOKT_DECIMALS))} wPOKT*`}
                  header={'Total Yield Earned'}
                  icon={'rake'}
                  size={'md'}
                />
                <MediumDepositWithdrawLinks onDepositWithdrawLink={onDepositWithdrawLink} />
                <MediumStatsFaqLinks />
              </div>
            </StyledSmallInfoCardsContainer>
          )}
        </InnerCardContainer>
      </Card>
      <Spacer size={'sm'} />
      <Container>
        <P2>
          *Estimated values do not represent or guarantee the actual results of any transaction or stake. In addition,
          other metrics and calculations shown on the app have not been independently verified or audited. Use at your
          own risk.
        </P2>
      </Container>
      <Spacer size={'lg'} />
    </>
  );
};

export default MyFarms;
