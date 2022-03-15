import { BigNumber } from "@ethersproject/bignumber";
import { Transaction } from "@ethersproject/transactions";

export interface EthereumRequestArguments {
  method: string;
  params?: unknown[] | object;
}

export interface EthereumProviderProps {
  children: React.ReactNode;
}

export interface _Block {
  hash: string;
  parentHash: string;
  number: number;
  timestamp: number;
  nonce: string;
  difficulty: number;
  _difficulty: BigNumber;
  gasLimit: BigNumber;
  gasUsed: BigNumber;
  miner: string;
  extraData: string;
  baseFeePerGas?: null | BigNumber;
}

export interface Block extends _Block {
  transactions: Array<string>;
}

export interface TransactionResponse extends Transaction {
  hash: string;
  blockNumber?: number;
  blockHash?: string;
  timestamp?: number;
  confirmations: number;
  from: string;
  raw?: string;
}

export type TransactionsType = TransactionResponse[];
