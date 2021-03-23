import React from 'react';
import 'styled-components/macro';
import { colors, GU } from 'components/theme';

import { ReactComponent as ApprovedSvg } from 'assets/icons/approved.svg';
import { ReactComponent as CloseSvg } from 'assets/icons/close.svg';
import { ReactComponent as FarmSvg } from 'assets/icons/farm.svg';
import { ReactComponent as RejectedSvg } from 'assets/icons/rejected.svg';
import { ReactComponent as TractorSvg } from 'assets/icons/tractor.svg';

import {
  StyledCloseContainer,
  StyledFarmContainer,
  StyledIconsContainer,
  StyledInnerContainer,
  StyledModalContainer,
  StyledStatusContainer,
  StyledTractorContainer,
} from './components';
import { H1, P1 } from 'components/Typography';
import Spacer from 'components/Spacer';

import { DepositWithdrawalContext } from 'contexts/DepositWithdrawal';

interface ITransactionStatus {
  type: 'TRANSACTION_WAITING' | 'TRANSACTION_APPROVED' | 'TRANSACTION_REJECTED';
}

const TransactionStatus: React.FC<ITransactionStatus> = ({ type }) => {
  const { inputValue, onCloseModal } = React.useContext(DepositWithdrawalContext);

  return (
    <StyledModalContainer>
      <StyledCloseContainer onClick={onCloseModal}>
        <CloseSvg />
      </StyledCloseContainer>
      <StyledInnerContainer>
        <H1 center={true} color={colors.white}>
          {type === 'TRANSACTION_WAITING' && 'Waiting for confirmation'}
          {type === 'TRANSACTION_APPROVED' && 'Transaction Approved'}
          {type === 'TRANSACTION_REJECTED' && 'Transaction Failed'}
        </H1>
        <Spacer size={'md'} />
        <StyledIconsContainer>
          <div
            css={`
              background: ${colors.white};
              height: ${GU}px;
              position: absolute;
              bottom: 0;
              width: 100%;
            `}
          />
          <StyledStatusContainer>
            {type === 'TRANSACTION_APPROVED' && <ApprovedSvg />}
            {type === 'TRANSACTION_REJECTED' && <RejectedSvg />}
          </StyledStatusContainer>
          <StyledFarmContainer>
            <FarmSvg />
          </StyledFarmContainer>
          <StyledTractorContainer type={type}>
            <TractorSvg />
          </StyledTractorContainer>
        </StyledIconsContainer>
        <Spacer size={'md'} />
        <P1 center={true} color={colors.white}>
          Deposit {inputValue} wPOKT
        </P1>
      </StyledInnerContainer>
    </StyledModalContainer>
  );
};

export default TransactionStatus;