import { BigNumber, ContractInterface, ContractTransaction, ethers, Signer, utils as EthersUtils } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import ERC20ABI from 'abis/ERC20.json';
import TokenGeyserABI from 'abis/TokenGeyser.json';
import { BigNumber as BNJS } from 'bignumber.js';

export function commifyString(number: string): string {
  const parts = number.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export function formatRelays(relays: string | BNJS): string {
  const relaysByMillion = new BNJS(relays).div(new BNJS(1000000));
  return relaysByMillion.toFixed(2);
}

export function formatFillPercentage(timeLeft?: number, totalTime?: number): number {
  if (totalTime && totalTime !== 0 && timeLeft) {
    const fillPercentage = 100 * (timeLeft / totalTime);
    return Math.round(100 - fillPercentage);
  } else {
    return 0;
  }
}

export function formatDaysFromTimestamp(totalTime?: number): number {
  if (totalTime && totalTime !== 0) {
    const durationDays = totalTime / 86400;
    return Math.round(durationDays);
  } else {
    return 0;
  }
}

function bigNum(value: string | number): BigNumber {
  return BigNumber.from(value);
}

export function formatOwnershipShare(share: number): string {
  return share >= 0.01 || share === 0 ? share.toFixed(2) : '< 0.01';
}

/**
 * Format a decimal-based number back to a big number
 *
 * @param {string} value the number
 * @param {number} decimals number of decimal places
 * @returns {BN} value converted to it's normal representation
 */
function parseUnits(value: string, decimals: number): BigNumber {
  try {
    return EthersUtils.parseUnits(value, decimals);
  } catch (err) {
    return bigNum(-1);
  }
}

export function parseInputValue(inputValue: string, decimals: number): BigNumber {
  const trimmedValue = inputValue.trim();

  return parseUnits(trimmedValue || '0', decimals);
}

/**
 * Shorten an Ethereum address. `charsLength` allows to change the number of
 * characters on both sides of the ellipsis.
 *
 * Examples:
 *   shortenAddress('0x19731977931271')    // 0x1973…1271
 *   shortenAddress('0x19731977931271', 2) // 0x19…71
 *   shortenAddress('0x197319')            // 0x197319 (already short enough)
 *
 * @param {string} address The address to shorten
 * @param {number} [charsLength=4] The number of characters to change on both sides of the ellipsis
 * @returns {string} The shortened address
 */
export function shortenAddress(address: string, charsLength = 4): string {
  const prefixLength = 2; // "0x"
  if (!address) {
    return '';
  }
  if (address.length < charsLength * 2 + prefixLength) {
    return address;
  }
  return address.slice(0, charsLength + prefixLength) + '…' + address.slice(-charsLength);
}

export const getERC20Contract = (signerOrProvider: Signer | Provider, address: string): ethers.Contract => {
  const contract = new ethers.Contract(address, (ERC20ABI as unknown) as ContractInterface, signerOrProvider);

  return contract;
};

export const getTokenGeyserContract = (signer: Signer, address: string): ethers.Contract => {
  const contract = new ethers.Contract(address, (TokenGeyserABI as unknown) as ContractInterface, signer);

  return contract;
};

export const stake = async (
  amount: string,
  tokenAddress: string,
  signer: Signer,
): Promise<boolean | ContractTransaction> => {
  try {
    const tokenContract = getTokenGeyserContract(signer, tokenAddress);
    const transaction: ContractTransaction = await tokenContract.stake(amount, '0x');
    return transaction;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const unstake = async (
  amount: string,
  tokenAddress: string,
  signer: Signer,
): Promise<boolean | ContractTransaction> => {
  try {
    const tokenContract = getTokenGeyserContract(signer, tokenAddress);
    const transaction: ContractTransaction = await tokenContract.unstake(amount, '0x');
    return transaction;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const approve = async (spenderAddress: string, tokenAddress: string, signer: Signer): Promise<boolean> => {
  try {
    const tokenContract = getERC20Contract(signer, tokenAddress);
    const transaction: ContractTransaction = await tokenContract.approve(spenderAddress, ethers.constants.MaxUint256);
    console.log(transaction);
    const { status } = await transaction.wait();
    if (status === 1) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getAllowance = async (
  userAddress: string,
  spenderAddress: string,
  tokenAddress: string,
  provider: Provider,
): Promise<string> => {
  try {
    const tokenContract = getERC20Contract(provider, tokenAddress);
    const balance = await tokenContract.allowance(userAddress, spenderAddress);
    return balance.toString();
  } catch (e) {
    console.error(e);
    return '0';
  }
};
