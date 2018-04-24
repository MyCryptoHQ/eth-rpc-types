import {
  DATA,
  DATA_20B,
  DATA_256B,
  DATA_32B,
  DATA_60B,
  DATA_8B,
  DefaultBlock,
  EthNullable,
  QUANTITY,
} from './primitives';

export interface ITransactionObject {
  from: DATA_20B; //The address the transaction is send from.
  to: undefined | DATA_20B; // (optional when creating new contract) The address the transaction is directed to.
  gas: undefined | QUANTITY; //(optional, default: 90000) Integer of the gas provided for the transaction execution. It will return unused gas.
  gasPrice: undefined | QUANTITY; //(optional, default: To-Be-Determined) Integer of the gasPrice used for each paid gas
  value: undefined | QUANTITY; //(optional) Integer of the value sent with this transaction
  data: DATA; //The compiled code of a contract OR the hash of the invoked method signature and encoded parameters. For details see Ethereum Contract ABI
  nonce: undefined | QUANTITY; // (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.
}

export interface ITransactionCallObject {
  from: undefined | DATA_20B; // (optional) The address the transaction is sent from.
  to: DATA_20B; // The address the transaction is directed to.
  gas: undefined | QUANTITY; //(optional) Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.
  gasPrice: undefined | QUANTITY; // (optional) Integer of the gasPrice used for each paid gas
  value: undefined | QUANTITY; //(optional) Integer of the value sent with this transaction
  data: undefined | DATA; // (optional) Hash of the method signature and encoded parameters. For details see Ethereum Contract ABI
}

export interface IBlockObject<
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
    ? ITransactionObjectForGetTransaction<Pending, boolean>[]
    : DATA_32B[];
  uncles: DATA[];
}

// https://github.com/ethereum/wiki/wiki/JSON-RPC#returns-42
export interface ILogObject<Pending extends boolean> {
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

export interface IFilterOptions {
  fromBlock?: DefaultBlock;
  toBlock?: DefaultBlock;
  address?: DATA_20B | DATA_20B[];
  topics?: (DATA_20B | DATA_20B[] | null)[] | null;
}

export interface IWhisperPostObject {
  from?: DATA_60B;
  to?: DATA_60B;
  topics: DATA[];
  payload: DATA;
  priority: QUANTITY;
  ttl: QUANTITY;
}

export interface IShhFilter<NoReceiver extends boolean> {
  to: EthNullable<NoReceiver, DATA_60B>;
  topics: (DATA | DATA[] | null)[];
}

export interface IShhMessage<NoReceiver extends boolean> {
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

// https://github.com/ethereum/wiki/wiki/JSON-RPC#returns-28
export interface ITransactionObjectForGetTransaction<
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

// https://github.com/ethereum/wiki/wiki/JSON-RPC#returns-31
// exclude pre byzantium type for now
export interface ITransactionReceiptObject<ContractCreation extends boolean> {
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
