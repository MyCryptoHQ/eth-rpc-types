import { DATA, IJsonRPC, RpcMethodNames } from './primitives';

export type DbPutString = IJsonRPC<
  RpcMethodNames.DB_PUT_STRING,
  boolean,
  [string, string, string]
>;

export type DbGetString = IJsonRPC<
  RpcMethodNames.DB_GET_STRING,
  string,
  [string, string]
>;

export type DbPutHex = IJsonRPC<
  RpcMethodNames.DB_PUT_HEX,
  boolean,
  [string, string, DATA]
>;

export type DbGetHex = IJsonRPC<
  RpcMethodNames.DB_GET_HEX,
  DATA,
  [string, string]
>;
