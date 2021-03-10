import React, { useCallback, useEffect, useState } from 'react';

import ERC20ABI from './ERC20.json';

// Constants
import { wpoktAddress } from 'constants/index';

// Context
import { Web3Context } from 'contexts/Web3';
import { BalanceContext } from './Context';
import { ethers, ContractInterface } from 'ethers';

export const BalanceProvider: React.FC = ({ children }) => {
  const { address, provider } = React.useContext(Web3Context);
  const [wpoktBalance, setWpoktBalance] = useState<any>();

  const getERC20Contract = (provider: any, address: string) => {
    const contract = new ethers.Contract(address, (ERC20ABI.abi as unknown) as ContractInterface, provider);

    return contract;
  };

  const getBalance = async (provider: any, tokenAddress: string, userAddress: string): Promise<string> => {
    const tokenContract = getERC20Contract(provider, tokenAddress);
    try {
      const balance = await tokenContract.balanceOf(userAddress);
      return balance.toString();
    } catch (e) {
      console.error(e);
      return '0';
    }
  };

  const fetchBalances = useCallback(
    async (userAddress: string, provider: any) => {
      const balance = await getBalance(provider, wpoktAddress as string, userAddress);
      console.log(balance);
      setWpoktBalance(balance);
    },
    [wpoktBalance],
  );

  useEffect(() => {
    if (address && provider) {
      fetchBalances(address, provider);
      const refreshInterval = setInterval(() => fetchBalances(address, provider), 10000);
      return () => clearInterval(refreshInterval);
    }
  }, [address, provider]);

  return (
    <BalanceContext.Provider
      value={{
        wpoktBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
