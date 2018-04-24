import { RpcMethodNames, DATA_32B, IJsonRPC } from './primitives';

export type EthGetWork = IJsonRPC<
  RpcMethodNames.ETH_GET_WORK,
  [DATA_32B, DATA_32B, DATA_32B]
>;

export type EthSubmitWork = IJsonRPC<
  RpcMethodNames.ETH_SUBMIT_WORK,
  boolean,
  [DATA_32B, DATA_32B, DATA_32B]
>;

export type EthSubmitHashrate = IJsonRPC<
  RpcMethodNames.ETH_SUBMIT_HASHRATE,
  boolean,
  [DATA_32B, DATA_32B]
>;
