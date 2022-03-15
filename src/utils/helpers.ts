import { BigNumber, ethers } from "ethers";

export const parseHash = (address: string, startLength = 8, endLength = -8) =>
  `${address.slice(0, startLength)}...${address.slice(endLength)}`;

export const convertWeiToEth = (value: BigNumber) =>
  ethers.utils.formatEther(value);

export const formatTimestamp = (date: number) =>
  new Date(date * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export const getNLatestEthereumBlocks = async (
  provider: ethers.providers.Web3Provider,
  n: number
) => {
  const lastBlockNumber = await provider?.getBlockNumber();
  const blocks = [];
  for (let i = 0; i < n; i++) {
    const currentBlock = await provider.getBlock(lastBlockNumber - i);
    blocks.push(currentBlock);
  }
  return blocks;
};

export const getFilteredTransactions = async (
  provider: ethers.providers.Web3Provider,
  blockNumber: number,
  searchedAddress = ""
) => {
  const response = await provider.getBlockWithTransactions(blockNumber);
  const filteredTransactions = response.transactions.filter((tx) => {
    if (!searchedAddress) {
      return convertWeiToEth(tx.value) !== "0.0";
    }
    return (
      convertWeiToEth(tx.value) !== "0.0" &&
      (tx?.from?.toLowerCase()?.includes(searchedAddress.toLowerCase()) ||
        tx?.to?.toLowerCase()?.includes(searchedAddress.toLowerCase()))
    );
  });
  return filteredTransactions;
};
