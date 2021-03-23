import React from 'react';
import styled from 'styled-components';

import ConfirmDeposit from './ConfirmDeposit';
import TransactionStatus from './TransactionStatus';

import { DepositWithdrawalContext } from 'contexts/DepositWithdrawal';

const Modals: React.FC = () => {
  const { modalOpen, onCloseModal, selectedModal } = React.useContext(DepositWithdrawalContext);

  return (
    <>
      {modalOpen && (
        <>
          <StyledBackground onClick={onCloseModal} />
          {selectedModal === 'CONFIRM_DEPOSIT' && <ConfirmDeposit />}
          {(selectedModal === 'TRANSACTION_WAITING' ||
            selectedModal === 'TRANSACTION_APPROVED' ||
            selectedModal === 'TRANSACTION_REJECTED') && <TransactionStatus type={selectedModal} />}
        </>
      )}
    </>
  );
};

export default Modals;

const StyledBackground = styled.div`
  background: rgba(0, 0, 0, 0.6);
  height: 100%;
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: 9999;
`;