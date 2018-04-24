import { DATA, IJsonRPC, RpcMethodNames } from './primitives';

export type Web3ClientVersion = IJsonRPC<RpcMethodNames.WEB_3_CLIENT_VERSION>;

export type Web3Sha3 = IJsonRPC<RpcMethodNames.WEB_3_SHA_3, DATA, [string]>;
