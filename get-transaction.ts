import {
  ITransactionObjectForGetTransaction,
  ITransactionReceiptObject,
} from './interfaces';
import { DATA_32B, IJsonRPC, RpcMethodNames } from './primitives';

export type EthGetTransactionByHash = IJsonRPC<
  RpcMethodNames.ETH_GET_TRANSACTION_BY_HASH,
  ITransactionObjectForGetTransaction<boolean, boolean> | null,
  [DATA_32B]
>;

export type EthGetTransactionReceipt<
  ContractCreation extends boolean = boolean
> = IJsonRPC<
  RpcMethodNames.ETH_GET_TRANSACTION_RECEIPT,
  ITransactionReceiptObject<ContractCreation>,
  [DATA_32B]
>;

export type EthGetTransactionType =
  | EthGetTransactionByHash
  | EthGetTransactionReceipt;
