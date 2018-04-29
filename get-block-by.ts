import {
  IBlockObject,
  ITransactionObjectForGetTransaction,
} from './interfaces';
import {
  DATA,
  DATA_32B,
  DefaultBlock,
  ENUM_DEFAULT_BLOCK,
  IJsonRPC,
  QUANTITY,
  RpcMethodNames,
} from './primitives';

export type EthGetBlockByHash<
  Pending extends boolean = boolean,
  FullTransactionObjects extends boolean = boolean
> = IJsonRPC<
  RpcMethodNames.ETH_GET_BLOCK_BY_HASH,
  IBlockObject<Pending, FullTransactionObjects> | null,
  [DATA, FullTransactionObjects]
>;

export type EthGetBlockByNumber<
  Pending extends boolean = boolean,
  FullTransactionObjects extends boolean = boolean
> = IJsonRPC<
  RpcMethodNames.ETH_GET_BLOCK_BY_NUMBER,
  IBlockObject<Pending, FullTransactionObjects> | null,
  [DefaultBlock, FullTransactionObjects]
>;

export type EthGetTransactionByBlockHashAndIndex = IJsonRPC<
  RpcMethodNames.ETH_GET_TRANSACTION_BY_BLOCK_HASH_AND_INDEX,
  ITransactionObjectForGetTransaction<boolean, boolean> | null,
  [DATA_32B, QUANTITY]
>;

export type EthGetTransactionByBlockNumberAndIndex = IJsonRPC<
  RpcMethodNames.ETH_GET_TRANSACTION_BY_BLOCK_NUMBER_AND_INDEX,
  ITransactionObjectForGetTransaction<boolean, boolean> | null,
  [DefaultBlock, QUANTITY]
>;

// need to test https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_getunclebyblockhashandindex

export type EthGetUncleByBlockHashAndIndex = IJsonRPC<
  RpcMethodNames.ETH_GET_UNCLE_BY_BLOCK_HASH_AND_INDEX,
  IBlockObject<false, false> | null,
  [DATA, QUANTITY]
>;

export type EthGetUncleByBlockNumberAndIndex<
  DBlock extends null | ENUM_DEFAULT_BLOCK = null
> = DBlock extends null
  ? IJsonRPC<
      RpcMethodNames.ETH_GET_UNCLE_BY_BLOCK_NUMBER_AND_INDEX,
      IBlockObject<boolean, false> | null,
      [QUANTITY, QUANTITY]
    >
  : DBlock extends ENUM_DEFAULT_BLOCK.PENDING
    ? IJsonRPC<
        RpcMethodNames.ETH_GET_UNCLE_BY_BLOCK_NUMBER_AND_INDEX,
        IBlockObject<true, false> | null,
        [ENUM_DEFAULT_BLOCK.PENDING, QUANTITY]
      >
    : DBlock extends Exclude<ENUM_DEFAULT_BLOCK, ENUM_DEFAULT_BLOCK.PENDING>
      ? IJsonRPC<
          RpcMethodNames.ETH_GET_UNCLE_BY_BLOCK_NUMBER_AND_INDEX,
          IBlockObject<false, false> | null,
          [Exclude<ENUM_DEFAULT_BLOCK, ENUM_DEFAULT_BLOCK.PENDING>, QUANTITY]
        >
      : never;

export type EthGetBlockByType =
  | EthGetBlockByHash
  | EthGetBlockByNumber
  | EthGetTransactionByBlockHashAndIndex
  | EthGetTransactionByBlockNumberAndIndex
  | EthGetUncleByBlockHashAndIndex
  | EthGetUncleByBlockNumberAndIndex;
