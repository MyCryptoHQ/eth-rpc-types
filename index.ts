enum RpcMethodNames {
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

type EthNullable<
  ExcludeValue extends boolean,
  Value
> = ExcludeValue extends false
  ? Value
  : ExcludeValue extends true ? null : Value | null;

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
type QUANTITY = string & { _tag: '__QUANTITY__' };

/**
 * When encoding UNFORMATTED DATA (byte arrays, account addresses, hashes, bytecode arrays):
 * encode as hex, prefix with "0x", two hex digits per byte. Examples:
 * 0x41 (size 1, "A")
 * 0x004200 (size 3, "\0B\0")
 * 0x (size 0, "")
 * WRONG: 0xf0f0f (must be even number of digits)
 * WRONG: 004200 (must be prefixed 0x)
 */
type DATA = string & { _tag: '__DATA__' };
type DATA_8B = string & { _tag: '__DATA__8_BYTES' };
type DATA_20B = string & { _tag: '__DATA__20_BYTES' };
type DATA_32B = string & { _tag: '__DATA__32_BYTES' };
type DATA_256B = string & { _tag: '__DATA__256_BYTES' };
type DATA_60B = string & { _tag: '__DATA__60_BYTES' };

type TAG = 'latest' | 'earliest' | 'pending';

type JsonRPC<
  Method extends RpcMethodNames,
  Response = string,
  Params extends Array<any> | null = null
> = {
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
};

interface ITransactionObject {
  from: DATA_20B; //The address the transaction is send from.
  to: undefined | DATA_20B; // (optional when creating new contract) The address the transaction is directed to.
  gas: undefined | QUANTITY; //(optional, default: 90000) Integer of the gas provided for the transaction execution. It will return unused gas.
  gasPrice: undefined | QUANTITY; //(optional, default: To-Be-Determined) Integer of the gasPrice used for each paid gas
  value: undefined | QUANTITY; //(optional) Integer of the value sent with this transaction
  data: DATA; //The compiled code of a contract OR the hash of the invoked method signature and encoded parameters. For details see Ethereum Contract ABI
  nonce: undefined | QUANTITY; // (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.
}

interface ITransactionCallObject {
  from: undefined | DATA_20B; // (optional) The address the transaction is sent from.
  to: DATA_20B; // The address the transaction is directed to.
  gas: undefined | QUANTITY; //(optional) Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.
  gasPrice: undefined | QUANTITY; // (optional) Integer of the gasPrice used for each paid gas
  value: undefined | QUANTITY; //(optional) Integer of the value sent with this transaction
  data: undefined | DATA; // (optional) Hash of the method signature and encoded parameters. For details see Ethereum Contract ABI
}

// https://github.com/ethereum/wiki/wiki/JSON-RPC#returns-28
interface GetTransaction_TransactionObject<
  Pending extends boolean,
  ContractCreation extends boolean
> {
  hash: DATA_32B;
  nonce: QUANTITY;
  blockHash: EthNullable<Pending, DATA_32B>;
  blockNumber: EthNullable<Pending, QUANTITY>;
  transactionIndex: EthNullable<Pending, QUANTITY>;
  from: DATA_20B;
  to: EthNullable<ContractCreation, DATA_20B>;
  value: QUANTITY;
  gasPrice: QUANTITY;
  gas: QUANTITY;
  input: DATA;
}

interface BlockObject<
  Pending extends boolean,
  FullTransactionObjects extends boolean
> {
  number: EthNullable<Pending, QUANTITY>;
  hash: EthNullable<Pending, DATA_32B>;
  parentHash: DATA_32B;
  nonce: EthNullable<Pending, DATA_8B>;
  sha3Uncles: DATA_32B;
  logsBloom: EthNullable<Pending, DATA_256B>;
  transactionsRoot: DATA_32B;
  stateRoot: DATA_32B;
  receiptsRoot: DATA_32B;
  miner: DATA_20B;
  difficulty: QUANTITY;
  totalDifficulty: QUANTITY;
  extraData: DATA;
  size: QUANTITY;
  gasLimit: QUANTITY;
  gasUsed: QUANTITY;
  timestamp: QUANTITY;
  transactions: FullTransactionObjects extends true
    ? GetTransaction_TransactionObject<Pending, boolean>[]
    : DATA_32B[];
  uncles: DATA[];
}

// https://github.com/ethereum/wiki/wiki/JSON-RPC#returns-42
interface ILogObject<Pending extends boolean> {
  removed: boolean;
  logIndex: EthNullable<Pending, QUANTITY>;
  transactionIndex: EthNullable<Pending, QUANTITY>;
  transactionHash: EthNullable<Pending, DATA_32B>;
  blockHash: EthNullable<Pending, DATA_32B>;
  blockNumber: EthNullable<Pending, QUANTITY>;
  address: DATA_20B;
  data: DATA;
  topics: DATA_32B[];
}
// https://github.com/ethereum/wiki/wiki/JSON-RPC#returns-31
// exclude pre byzantium type for now
interface ITransactionReceiptObject<ContractCreation extends boolean> {
  transactionHash: DATA_32B;
  transactionIndex: QUANTITY;
  blockHash: DATA_32B;
  blockNumber: QUANTITY;
  cumulativeGasUsed: QUANTITY;
  gasUsed: QUANTITY;
  contractAddress: EthNullable<ContractCreation, DATA_20B>;
  logs: ILogObject<false>[];
  logsBloom: DATA_256B;
  status: '0x1' | '0x0';
}

interface IFilterOptions {
  fromBlock?: QUANTITY | TAG;
  toBlock?: QUANTITY | TAG;
  address?: DATA_20B | DATA_20B[];
  topics?: (DATA_20B | DATA_20B[] | null)[] | null;
}

interface IWhisperPostObject {
  from?: DATA_60B;
  to?: DATA_60B;
  topics: DATA[];
  payload: DATA;
  priority: QUANTITY;
  ttl: QUANTITY;
}

interface IShhFilter<NoReceiver extends boolean> {
  to: EthNullable<NoReceiver, DATA_60B>;
  topics: (DATA | DATA[] | null)[];
}

interface IShhMessage<NoReceiver extends boolean> {
  hash: DATA_60B;
  from: EthNullable<NoReceiver, DATA_60B>;
  to: EthNullable<NoReceiver, DATA_60B>;
  expiry: QUANTITY;
  ttl: QUANTITY;
  sent: QUANTITY;
  topics: DATA[];
  payload: DATA;
  workProved: QUANTITY;
}

export type Web3ClientVersion = JsonRPC<RpcMethodNames.WEB_3_CLIENT_VERSION>;

export type Web3Sha3 = JsonRPC<RpcMethodNames.WEB_3_SHA_3, DATA, [string]>;

export type NetVersion = JsonRPC<RpcMethodNames.NET_VERSION, string>;

export type NetListening = JsonRPC<RpcMethodNames.NET_LISTENING, boolean>;

export type NetPeerCount = JsonRPC<RpcMethodNames.NET_PEER_COUNT, QUANTITY>;

export type EthProtocolVersion = JsonRPC<
  RpcMethodNames.ETH_PROTOCOL_VERSION,
  string
>;

export type EthSyncing = JsonRPC<
  RpcMethodNames.ETH_SYNCING,
  | { startingBlock: QUANTITY; currentBlock: QUANTITY; highestBlock: QUANTITY }
  | boolean
>;

export type EthCoinbase = JsonRPC<RpcMethodNames.ETH_COINBASE, DATA_20B>;

export type EthMining = JsonRPC<RpcMethodNames.ETH_MINING, boolean>;

export type EthHashrate = JsonRPC<RpcMethodNames.ETH_HASHRATE, QUANTITY>;

export type EthGasPrice = JsonRPC<RpcMethodNames.ETH_GAS_PRICE, QUANTITY>;

export type EthAccounts = JsonRPC<RpcMethodNames.ETH_ACCOUNTS, DATA_20B[]>;

export type EthBlockNumber = JsonRPC<RpcMethodNames.ETH_BLOCK_NUMBER, QUANTITY>;

export type EthGetBalance = JsonRPC<
  RpcMethodNames.ETH_GET_BALANCE,
  QUANTITY,
  [DATA_20B, QUANTITY | TAG]
>;

export type EthGetStorageAt = JsonRPC<
  RpcMethodNames.ETH_GET_STORAGE_AT,
  DATA,
  [DATA_20B, QUANTITY, QUANTITY | TAG]
>;

export type EthGetTransactionCount = JsonRPC<
  RpcMethodNames.ETH_GET_TRANSACTION_COUNT,
  QUANTITY,
  [DATA_20B, QUANTITY | TAG]
>;

export type EthGetBlockTransactionCountByHash = JsonRPC<
  RpcMethodNames.ETH_GET_BLOCK_TRANSACTION_COUNT_BY_HASH,
  QUANTITY,
  [DATA_32B]
>;

export type EthGetBlockTransactionCountByNumber = JsonRPC<
  RpcMethodNames.ETH_GET_BLOCK_TRANSACTION_COUNT_BY_NUMBER,
  QUANTITY,
  [QUANTITY | TAG]
>;

export type EthGetUncleCountByBlockHash = JsonRPC<
  RpcMethodNames.ETH_GET_UNCLE_COUNT_BY_BLOCK_HASH,
  QUANTITY,
  [DATA_32B]
>;

export type EthGetUncleCountByBlockNumber = JsonRPC<
  RpcMethodNames.ETH_GET_UNCLE_COUNT_BY_BLOCK_NUMBER,
  QUANTITY,
  [QUANTITY | TAG]
>;

export type EthGetCode = JsonRPC<
  RpcMethodNames.ETH_GET_CODE,
  DATA,
  [DATA_20B, QUANTITY | TAG]
>;

export type EthSign = JsonRPC<RpcMethodNames.ETH_SIGN, DATA, [DATA_20B, DATA]>;

export type EthSendTransaction = JsonRPC<
  RpcMethodNames.ETH_SEND_TRANSACTION,
  DATA_32B,
  [ITransactionObject]
>;

export type EthSendRawTransaction = JsonRPC<
  RpcMethodNames.ETH_SEND_RAW_TRANSACTION,
  DATA_32B,
  [DATA]
>;

export type EthCall = JsonRPC<
  RpcMethodNames.ETH_CALL,
  DATA,
  [ITransactionCallObject, QUANTITY | TAG]
>;

export type EthEstimateGas = JsonRPC<
  RpcMethodNames.ETH_ESTIMATE_GAS,
  QUANTITY,
  [Partial<ITransactionCallObject>]
>;

export type EthGetBlockByHash =
  | JsonRPC<
      RpcMethodNames.ETH_GET_BLOCK_BY_HASH,
      BlockObject<false, false> | null,
      [DATA, false]
    >
  | JsonRPC<
      RpcMethodNames.ETH_GET_BLOCK_BY_HASH,
      BlockObject<false, true> | null,
      [DATA, true]
    >
  | JsonRPC<
      RpcMethodNames.ETH_GET_BLOCK_BY_HASH,
      BlockObject<true, false> | null,
      [DATA, false]
    >
  | JsonRPC<
      RpcMethodNames.ETH_GET_BLOCK_BY_HASH,
      BlockObject<true, true> | null,
      [DATA, true]
    >;

export type EthGetBlockByNumber =
  | JsonRPC<
      RpcMethodNames.ETH_GET_BLOCK_BY_NUMBER,
      BlockObject<false, false> | null,
      [QUANTITY | TAG, false]
    >
  | JsonRPC<
      RpcMethodNames.ETH_GET_BLOCK_BY_NUMBER,
      BlockObject<false, true> | null,
      [QUANTITY | TAG, true]
    >
  | JsonRPC<
      RpcMethodNames.ETH_GET_BLOCK_BY_NUMBER,
      BlockObject<true, false> | null,
      [QUANTITY | TAG, false]
    >
  | JsonRPC<
      RpcMethodNames.ETH_GET_BLOCK_BY_NUMBER,
      BlockObject<true, true> | null,
      [QUANTITY | TAG, true]
    >;

export type EthGetTransactionByHash = JsonRPC<
  RpcMethodNames.ETH_GET_TRANSACTION_BY_HASH,
  GetTransaction_TransactionObject<boolean, boolean> | null,
  [DATA_32B]
>;

export type EthGetTransactionByBlockHashAndIndex = JsonRPC<
  RpcMethodNames.ETH_GET_TRANSACTION_BY_BLOCK_HASH_AND_INDEX,
  GetTransaction_TransactionObject<boolean, boolean> | null,
  [DATA_32B, QUANTITY]
>;

export type EthGetTransactionByBlockNumberAndIndex = JsonRPC<
  RpcMethodNames.ETH_GET_TRANSACTION_BY_BLOCK_NUMBER_AND_INDEX,
  GetTransaction_TransactionObject<boolean, boolean> | null,
  [QUANTITY | TAG, QUANTITY]
>;

export type EthGetTransactionReceipt<
  ContractCreation extends boolean = boolean
> = JsonRPC<
  RpcMethodNames.ETH_GET_TRANSACTION_RECEIPT,
  ITransactionReceiptObject<ContractCreation>,
  [DATA_32B]
>;

// need to test https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_getunclebyblockhashandindex

export type EthGetUncleByBlockHashAndIndex = JsonRPC<
  RpcMethodNames.ETH_GET_UNCLE_BY_BLOCK_HASH_AND_INDEX,
  BlockObject<false, false> | null,
  [DATA, QUANTITY]
>;

export type EthGetUncleByBlockNumberAndIndex =
  | JsonRPC<
      RpcMethodNames.ETH_GET_UNCLE_BY_BLOCK_NUMBER_AND_INDEX,
      BlockObject<false, false> | null,
      [Exclude<TAG, 'pending'>, QUANTITY]
    >
  | JsonRPC<
      RpcMethodNames.ETH_GET_UNCLE_BY_BLOCK_NUMBER_AND_INDEX,
      BlockObject<true, false> | null,
      ['pending', QUANTITY]
    >
  | JsonRPC<
      RpcMethodNames.ETH_GET_UNCLE_BY_BLOCK_NUMBER_AND_INDEX,
      BlockObject<boolean, false> | null,
      [QUANTITY, QUANTITY]
    >;

export type EthGetCompilers = JsonRPC<
  RpcMethodNames.ETH_GET_COMPILERS,
  string[]
>;

export type EthCompileLll = JsonRPC<
  RpcMethodNames.ETH_COMPILE_LLL,
  DATA,
  [string]
>;

// TODO: finish type

export type EthCompileSolidity = JsonRPC<
  RpcMethodNames.ETH_COMPILE_SOLIDITY,
  any,
  [string]
>;

export type EthCompileSerpent = JsonRPC<
  RpcMethodNames.ETH_COMPILE_SERPENT,
  DATA,
  [string]
>;

export type EthNewFilter = JsonRPC<
  RpcMethodNames.ETH_NEW_FILTER,
  QUANTITY,
  [IFilterOptions]
>;

export type EthNewBlockFilter = JsonRPC<
  RpcMethodNames.ETH_NEW_BLOCK_FILTER,
  QUANTITY
>;

export type EthNewPendingTransactionFilter = JsonRPC<
  RpcMethodNames.ETH_NEW_PENDING_TRANSACTION_FILTER,
  QUANTITY
>;

export type EthUninstallFilter = JsonRPC<
  RpcMethodNames.ETH_UNINSTALL_FILTER,
  boolean,
  [QUANTITY]
>;

enum FilterType {
  eth_newBlockFilter,

  eth_newPendingTransactionFilter,

  eth_newFilter,
}

export type EthGetFilterChanges<
  T extends FilterType,
  Pending extends boolean = boolean
> = T extends FilterType.eth_newBlockFilter
  ? JsonRPC<RpcMethodNames.ETH_GET_FILTER_CHANGES, DATA_32B[], [QUANTITY]>
  : T extends FilterType.eth_newPendingTransactionFilter
    ? JsonRPC<RpcMethodNames.ETH_GET_FILTER_CHANGES, DATA_32B[], [QUANTITY]>
    : T extends FilterType.eth_newFilter
      ? JsonRPC<
          RpcMethodNames.ETH_GET_FILTER_CHANGES,
          ILogObject<Pending>[],
          [QUANTITY]
        >
      : never;

export type EthGetFilterLogs<
  T extends FilterType,
  Pending extends boolean = boolean
> = T extends FilterType.eth_newBlockFilter
  ? JsonRPC<RpcMethodNames.ETH_GET_FILTER_LOGS, DATA_32B[], [QUANTITY]>
  : T extends FilterType.eth_newPendingTransactionFilter
    ? JsonRPC<RpcMethodNames.ETH_GET_FILTER_LOGS, DATA_32B[], [QUANTITY]>
    : T extends FilterType.eth_newFilter
      ? JsonRPC<
          RpcMethodNames.ETH_GET_FILTER_LOGS,
          ILogObject<Pending>[],
          [QUANTITY]
        >
      : never;

export type EthGetLogs<Pending extends boolean = boolean> = JsonRPC<
  RpcMethodNames.ETH_GET_LOGS,
  ILogObject<Pending>[],
  [IFilterOptions]
>;

export type EthGetWork = JsonRPC<
  RpcMethodNames.ETH_GET_WORK,
  [DATA_32B, DATA_32B, DATA_32B]
>;

export type EthSubmitWork = JsonRPC<
  RpcMethodNames.ETH_SUBMIT_WORK,
  boolean,
  [DATA_32B, DATA_32B, DATA_32B]
>;

export type EthSubmitHashrate = JsonRPC<
  RpcMethodNames.ETH_SUBMIT_HASHRATE,
  boolean,
  [DATA_32B, DATA_32B]
>;

export type DbPutString = JsonRPC<
  RpcMethodNames.DB_PUT_STRING,
  boolean,
  [string, string, string]
>;

export type DbGetString = JsonRPC<
  RpcMethodNames.DB_GET_STRING,
  string,
  [string, string]
>;

export type DbPutHex = JsonRPC<
  RpcMethodNames.DB_PUT_HEX,
  boolean,
  [string, string, DATA]
>;

export type DbGetHex = JsonRPC<
  RpcMethodNames.DB_GET_HEX,
  DATA,
  [string, string]
>;

export type ShhPost = JsonRPC<RpcMethodNames.SHH_POST, string>;

export type ShhVersion = JsonRPC<
  RpcMethodNames.SHH_VERSION,
  boolean,
  [IWhisperPostObject]
>;

export type ShhNewIdentity = JsonRPC<RpcMethodNames.SHH_NEW_IDENTITY, DATA_60B>;

export type ShhHasIdentity = JsonRPC<
  RpcMethodNames.SHH_HAS_IDENTITY,
  boolean,
  [DATA_60B]
>;

export type ShhNewGroup = JsonRPC<RpcMethodNames.SHH_NEW_GROUP, DATA_60B>;

export type ShhAddToGroup = JsonRPC<
  RpcMethodNames.SHH_ADD_TO_GROUP,
  boolean,
  [DATA_60B]
>;

export type ShhNewFilter<NoReceiver extends boolean = boolean> = JsonRPC<
  RpcMethodNames.SHH_NEW_FILTER,
  QUANTITY,
  [IShhFilter<NoReceiver>]
>;

export type ShhUninstallFilter = JsonRPC<
  RpcMethodNames.SHH_UNINSTALL_FILTER,
  boolean,
  [QUANTITY]
>;

export type ShhGetFilterChanges<NoReceiver extends boolean = boolean> = JsonRPC<
  RpcMethodNames.SHH_GET_FILTER_CHANGES,
  IShhMessage<NoReceiver>,
  [QUANTITY]
>;

export type ShhGetMessages<NoReceiver extends boolean = boolean> = JsonRPC<
  RpcMethodNames.SHH_GET_MESSAGES,
  IShhMessage<NoReceiver>,
  [QUANTITY]
>;
