import React from 'react';
import { ethers, Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { initOnboard } from 'libs/connector';
import getSigner from 'libs/signer';
import { API as OnboardAPI, Wallet } from 'libs/types';

export interface ContextValues {
  address: string | null;
  network: number | null;
  // eslint-disable-next-line
  balance: any;
  onboard: OnboardAPI | null;
  wallet: Wallet | Record<string, never>;
  provider: Provider | null;
  signer: Signer | null;
}

export const Web3Context = React.createContext<ContextValues>({
  address: '',
  network: 1,
  balance: '',
  onboard: null,
  wallet: {},
  provider: null,
  signer: null,
});

let provider: Provider | null;
let signer: Signer | null;
const WPOKT_SELECTED_WALLET = 'WPOKT_SELECTED_WALLET';

export const Web3Provider: React.FC = ({ children }) => {
  const [address, setAddress] = React.useState(null);
  const [network, setNetwork] = React.useState(null);
  const [balance, setBalance] = React.useState(null);
  const [wallet, setWallet] = React.useState<Wallet | Record<string, never>>({});

  const [onboard, setOnboard] = React.useState<OnboardAPI | null>(null);

  React.useEffect(() => {
    const onboard = initOnboard({
      address: (setAddress as unknown) as (address: string) => void,
      network: (setNetwork as unknown) as (networkId: number) => void,
      balance: (setBalance as unknown) as (balance: string) => void,
      wallet: (wallet: Wallet) => {
        if (wallet.provider) {
          setWallet(wallet);

          const ethersProvider = new ethers.providers.Web3Provider(wallet.provider);

          provider = ethersProvider;
          signer = getSigner(ethersProvider);

          if (wallet.name) {
            window.localStorage.setItem(WPOKT_SELECTED_WALLET, wallet.name);
          }
        } else {
          provider = null;
          signer = null;
          setWallet({});
        }
      },
    });
    setOnboard(onboard);
  }, []);

  React.useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem(WPOKT_SELECTED_WALLET);

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
    }
  }, [onboard]);

  return (
    <Web3Context.Provider
      value={{
        address,
        network,
        balance,
        wallet,
        onboard,
        provider,
        signer,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
