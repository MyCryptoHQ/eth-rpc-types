import {
  IJsonRPC,
  RpcMethodNames,
  QUANTITY,
  DATA_20B,
  DefaultBlock,
  DATA_32B,
} from './primitives';

export type EthGetTransactionCount = IJsonRPC<
  RpcMethodNames.ETH_GET_TRANSACTION_COUNT,
  QUANTITY,
  [DATA_20B, DefaultBlock]
>;

export type EthGetBlockTransactionCountByHash = IJsonRPC<
  RpcMethodNames.ETH_GET_BLOCK_TRANSACTION_COUNT_BY_HASH,
  QUANTITY,
  [DATA_32B]
>;

export type EthGetBlockTransactionCountByNumber = IJsonRPC<
  RpcMethodNames.ETH_GET_BLOCK_TRANSACTION_COUNT_BY_NUMBER,
  QUANTITY,
  [DefaultBlock]
>;

export type EthGetUncleCountByBlockHash = IJsonRPC<
  RpcMethodNames.ETH_GET_UNCLE_COUNT_BY_BLOCK_HASH,
  QUANTITY,
  [DATA_32B]
>;

export type EthGetUncleCountByBlockNumber = IJsonRPC<
  RpcMethodNames.ETH_GET_UNCLE_COUNT_BY_BLOCK_NUMBER,
  QUANTITY,
  [DefaultBlock]
>;
