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
} from './components';
import { Flex } from 'components/Containers';
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

import { DepositWithdrawalContext } from 'contexts/DepositWithdrawal';

const MyFarms: React.FC = () => {
  const history = useHistory();
  const { onSetActionType } = React.useContext(DepositWithdrawalContext);
  const [farmSelected, setFarmSelected] = React.useState<boolean>(false);

  const onDepositWithdrawLink = (actionType: 'deposit' | 'withdraw') => {
    onSetActionType(actionType);
    history.replace('/');
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
                <Flex>
                  <StyledStakedText color={colors.white}>2,669.830235wPOKT</StyledStakedText>
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
                <SmallInfoCard iconType={'question'} statTitle={'APY'} statContent={'10%'} />
                <SmallInfoCard iconType={'caret'} statTitle={'Multiplier'} statContent={'1.0 X'} />
                <SmallInfoCard iconType={'question'} statTitle={'Total Staked'} statContent={'23,456.3 wpokt'} />
                <SmallInfoCard iconType={'caret'} statTitle={'Max Relays/Day'} statContent={'1 M'} />
                <SmallInfoCard iconType={'question'} statTitle={'MAX RELAYS/DAY'} statContent={'10 M '} />
                <SmallInfoCard iconType={'question'} statTitle={'Supported APps'} statContent={'12'} />
                <SmallInfoCard iconType={'question'} statTitle={'Rewards unlocked'} statContent={'30%'} />
                <SmallInfoCard iconType={'question'} statTitle={'Farm ownership'} statContent={'14%'} />
                <SmallInfoCard iconType={'question'} statTitle={'Duration'} statContent={'54 Days'} statFill={38} />
                <SmallInfoCardExtraLinks />
              </StyledContentContainer>
              <div>
                <MediumInfoCard amount={'5,563.865330 wPOKT'} header={'Total Yield Earned'} icon={'rake'} />
                <MediumDepositWithdrawLinks onDepositWithdrawLink={onDepositWithdrawLink} />
                <MediumStatsFaqLinks />
              </div>
            </StyledSmallInfoCardsContainer>
          )}
        </InnerCardContainer>
      </Card>
      <Spacer size={'lg'} />
    </>
  );
};

export default MyFarms;