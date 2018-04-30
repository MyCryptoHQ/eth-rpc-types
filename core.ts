import { ITransactionCallObject, ITransactionObject } from './interfaces';
import {
  DATA,
  DATA_20B,
  DATA_32B,
  DefaultBlock,
  IJsonRPC,
  QUANTITY,
  RpcMethodNames,
} from './primitives';

export type NetVersion<EthNetOnly extends boolean = true> = IJsonRPC<
  RpcMethodNames.NET_VERSION,
  EthNetOnly extends true ? '1' | '2' | '3' | '4' | '42' : number
>;

export type NetListening = IJsonRPC<RpcMethodNames.NET_LISTENING, boolean>;

export type NetPeerCount = IJsonRPC<RpcMethodNames.NET_PEER_COUNT, QUANTITY>;

export type EthProtocolVersion = IJsonRPC<
  RpcMethodNames.ETH_PROTOCOL_VERSION,
  string
>;

export type EthSyncing = IJsonRPC<
  RpcMethodNames.ETH_SYNCING,
  | { startingBlock: QUANTITY; currentBlock: QUANTITY; highestBlock: QUANTITY }
  | boolean
>;

export type EthCoinbase = IJsonRPC<RpcMethodNames.ETH_COINBASE, DATA_20B>;

export type EthMining = IJsonRPC<RpcMethodNames.ETH_MINING, boolean>;

export type EthHashrate = IJsonRPC<RpcMethodNames.ETH_HASHRATE, QUANTITY>;

export type EthGasPrice = IJsonRPC<RpcMethodNames.ETH_GAS_PRICE, QUANTITY>;

export type EthAccounts = IJsonRPC<RpcMethodNames.ETH_ACCOUNTS, DATA_20B[]>;

export type EthBlockNumber = IJsonRPC<
  RpcMethodNames.ETH_BLOCK_NUMBER,
  QUANTITY
>;

export type EthGetBalance = IJsonRPC<
  RpcMethodNames.ETH_GET_BALANCE,
  QUANTITY,
  [DATA_20B, DefaultBlock]
>;

export type EthGetStorageAt = IJsonRPC<
  RpcMethodNames.ETH_GET_STORAGE_AT,
  DATA,
  [DATA_20B, QUANTITY, DefaultBlock]
>;

export type EthGetCode = IJsonRPC<
  RpcMethodNames.ETH_GET_CODE,
  DATA,
  [DATA_20B, DefaultBlock]
>;

export type EthSign = IJsonRPC<RpcMethodNames.ETH_SIGN, DATA, [DATA_20B, DATA]>;

export type EthPersonalSIgn = IJsonRPC<
  RpcMethodNames.ETH_PERSONAL_SIGN,
  DATA,
  [DATA_20B, DATA]
>;

export type EthSendTransaction = IJsonRPC<
  RpcMethodNames.ETH_SEND_TRANSACTION,
  DATA_32B,
  [ITransactionObject]
>;

export type EthSendRawTransaction = IJsonRPC<
  RpcMethodNames.ETH_SEND_RAW_TRANSACTION,
  DATA_32B,
  [DATA]
>;

export type EthCall = IJsonRPC<
  RpcMethodNames.ETH_CALL,
  DATA,
  [ITransactionCallObject, DefaultBlock]
>;

export type EthEstimateGas = IJsonRPC<
  RpcMethodNames.ETH_ESTIMATE_GAS,
  QUANTITY,
  [Partial<ITransactionCallObject>]
>;

export type EthCoreType =
  | NetVersion
  | NetListening
  | NetPeerCount
  | EthProtocolVersion
  | EthSyncing
  | EthCoinbase
  | EthMining
  | EthHashrate
  | EthGasPrice
  | EthAccounts
  | EthBlockNumber
  | EthGetBalance
  | EthGetStorageAt
  | EthGetCode
  | EthSign
  | EthSendTransaction
  | EthSendRawTransaction
  | EthCall
  | EthEstimateGas;
