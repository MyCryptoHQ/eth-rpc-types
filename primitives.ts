export enum RpcMethodNames {
  WEB_3_CLIENT_VERSION = 'web3_clientVersion',
  WEB_3_SHA_3 = 'web3_sha3',
  NET_VERSION = 'net_version',
  NET_PEER_COUNT = 'net_peerCount',
  NET_LISTENING = 'net_listening',
  ETH_PROTOCOL_VERSION = 'eth_protocolVersion',
  ETH_SYNCING = 'eth_syncing',
  ETH_COINBASE = 'eth_coinbase',
  ETH_MINING = 'eth_mining',
  ETH_HASHRATE = 'eth_hashrate',
  ETH_GAS_PRICE = 'eth_gasPrice',
  ETH_ACCOUNTS = 'eth_accounts',
  ETH_BLOCK_NUMBER = 'eth_blockNumber',
  ETH_GET_BALANCE = 'eth_getBalance',
  ETH_GET_STORAGE_AT = 'eth_getStorageAt',
  ETH_GET_TRANSACTION_COUNT = 'eth_getTransactionCount',
  ETH_GET_BLOCK_TRANSACTION_COUNT_BY_HASH = 'eth_getBlockTransactionCountByHash',
  ETH_GET_BLOCK_TRANSACTION_COUNT_BY_NUMBER = 'eth_getBlockTransactionCountByNumber',
  ETH_GET_UNCLE_COUNT_BY_BLOCK_HASH = 'eth_getUncleCountByBlockHash',
  ETH_GET_UNCLE_COUNT_BY_BLOCK_NUMBER = 'eth_getUncleCountByBlockNumber',
  ETH_GET_CODE = 'eth_getCode',
  ETH_SIGN = 'eth_sign',
  ETH_SEND_TRANSACTION = 'eth_sendTransaction',
  ETH_SEND_RAW_TRANSACTION = 'eth_sendRawTransaction',
  ETH_CALL = 'eth_call',
  ETH_ESTIMATE_GAS = 'eth_estimateGas',
  ETH_GET_BLOCK_BY_HASH = 'eth_getBlockByHash',
  ETH_GET_BLOCK_BY_NUMBER = 'eth_getBlockByNumber',
  ETH_GET_TRANSACTION_BY_HASH = 'eth_getTransactionByHash',
  ETH_GET_TRANSACTION_BY_BLOCK_HASH_AND_INDEX = 'eth_getTransactionByBlockHashAndIndex',
  ETH_GET_TRANSACTION_BY_BLOCK_NUMBER_AND_INDEX = 'eth_getTransactionByBlockNumberAndIndex',
  ETH_GET_TRANSACTION_RECEIPT = 'eth_getTransactionReceipt',
  ETH_GET_UNCLE_BY_BLOCK_HASH_AND_INDEX = 'eth_getUncleByBlockHashAndIndex',
  ETH_GET_UNCLE_BY_BLOCK_NUMBER_AND_INDEX = 'eth_getUncleByBlockNumberAndIndex',
  ETH_GET_COMPILERS = 'eth_getCompilers',
  ETH_COMPILE_LLL = 'eth_compileLLL',
  ETH_COMPILE_SOLIDITY = 'eth_compileSolidity',
  ETH_COMPILE_SERPENT = 'eth_compileSerpent',
  ETH_NEW_FILTER = 'eth_newFilter',
  ETH_NEW_BLOCK_FILTER = 'eth_newBlockFilter',
  ETH_NEW_PENDING_TRANSACTION_FILTER = 'eth_newPendingTransactionFilter',
  ETH_UNINSTALL_FILTER = 'eth_uninstallFilter',
  ETH_GET_FILTER_CHANGES = 'eth_getFilterChanges',
  ETH_GET_FILTER_LOGS = 'eth_getFilterLogs',
  ETH_GET_LOGS = 'eth_getLogs',
  ETH_GET_WORK = 'eth_getWork',
  ETH_SUBMIT_WORK = 'eth_submitWork',
  ETH_SUBMIT_HASHRATE = 'eth_submitHashrate',
  DB_PUT_STRING = 'db_putString',
  DB_GET_STRING = 'db_getString',
  DB_PUT_HEX = 'db_putHex',
  DB_GET_HEX = 'db_getHex',
  SHH_POST = 'shh_post',
  SHH_VERSION = 'shh_version',
  SHH_NEW_IDENTITY = 'shh_newIdentity',
  SHH_HAS_IDENTITY = 'shh_hasIdentity',
  SHH_NEW_GROUP = 'shh_newGroup',
  SHH_ADD_TO_GROUP = 'shh_addToGroup',
  SHH_NEW_FILTER = 'shh_newFilter',
  SHH_UNINSTALL_FILTER = 'shh_uninstallFilter',
  SHH_GET_FILTER_CHANGES = 'shh_getFilterChanges',
  SHH_GET_MESSAGES = 'shh_getMessages',
}

export enum ENUM_DEFAULT_BLOCK {
  LATEST = 'latest',
  EARLIEST = 'earliest',
  PENDING = 'pending',
}

export type DefaultBlock = QUANTITY | ENUM_DEFAULT_BLOCK;

/**
 * When encoding QUANTITIES (integers, numbers):
 * encode as hex, prefix with "0x", the most compact representation
 * (slight exception: zero should be represented as "0x0"). Examples:
 * 0x41 (65 in decimal)
 * 0x400 (1024 in decimal)
 * WRONG: 0x (should always have at least one digit - zero is "0x0")
 * WRONG: 0x0400 (no leading zeroes allowed)
 * WRONG: ff (must be prefixed 0x)
 */
export type QUANTITY = string & { _tag: '__QUANTITY__' };

/**
 * When encoding UNFORMATTED DATA (byte arrays, account addresses, hashes, bytecode arrays):
 * encode as hex, prefix with "0x", two hex digits per byte. Examples:
 * 0x41 (size 1, "A")
 * 0x004200 (size 3, "\0B\0")
 * 0x (size 0, "")
 * WRONG: 0xf0f0f (must be even number of digits)
 * WRONG: 004200 (must be prefixed 0x)
 */
export type DATA = string & { _tag: '__DATA__' };
export type DATA_8B = string & { _tag: '__DATA__8_BYTES' };
export type DATA_20B = string & { _tag: '__DATA__20_BYTES' };
export type DATA_32B = string & { _tag: '__DATA__32_BYTES' };
export type DATA_256B = string & { _tag: '__DATA__256_BYTES' };
export type DATA_60B = string & { _tag: '__DATA__60_BYTES' };

export type EthNullable<
  ExcludeValue extends boolean,
  Value
> = ExcludeValue extends false
  ? Value
  : ExcludeValue extends true ? null : Value | null;

export interface IJsonRPC<
  Method extends RpcMethodNames,
  Response = string,
  Params extends any[] | never[] = never[]
> {
  request: {
    method: Method;
    params: Params;
    id: number;
    jsonrpc: '2.0';
  };
  response: {
    id: number;
    jsonrpc: '2.0';
    result: Response;
  };
}

export type AnyJsonRpc = IJsonRPC<any, any, any>;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ExcludeRpcVer<
  T extends AnyJsonRpc['request'] | AnyJsonRpc['response']
> = Omit<T, 'jsonrpc' | 'id'>;

export type ExtractReq<T extends AnyJsonRpc> = T['request'];

export type ExtractResponse<T extends AnyJsonRpc> = T['response'];

export type ExtractParams<T extends IJsonRPC<any, any, any>> = ExtractReq<
  T
>['params'];

export type ExtractResult<T extends IJsonRPC<any, any, any>> = ExtractResponse<
  T
>['result'];
