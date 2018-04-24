import { DATA, IJsonRPC, RpcMethodNames } from './primitives';

export type EthGetCompilers = IJsonRPC<
  RpcMethodNames.ETH_GET_COMPILERS,
  string[]
>;

export type EthCompileLll = IJsonRPC<
  RpcMethodNames.ETH_COMPILE_LLL,
  DATA,
  [string]
>;

// TODO: finish type

export type EthCompileSolidity = IJsonRPC<
  RpcMethodNames.ETH_COMPILE_SOLIDITY,
  any,
  [string]
>;

export type EthCompileSerpent = IJsonRPC<
  RpcMethodNames.ETH_COMPILE_SERPENT,
  DATA,
  [string]
>;
