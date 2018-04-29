import { IFilterOptions, ILogObject } from './interfaces';
import { DATA_32B, IJsonRPC, QUANTITY, RpcMethodNames } from './primitives';

export type EthNewFilter = IJsonRPC<
  RpcMethodNames.ETH_NEW_FILTER,
  QUANTITY,
  [IFilterOptions]
>;

export type EthNewBlockFilter = IJsonRPC<
  RpcMethodNames.ETH_NEW_BLOCK_FILTER,
  QUANTITY
>;

export type EthNewPendingTransactionFilter = IJsonRPC<
  RpcMethodNames.ETH_NEW_PENDING_TRANSACTION_FILTER,
  QUANTITY
>;

export type EthUninstallFilter = IJsonRPC<
  RpcMethodNames.ETH_UNINSTALL_FILTER,
  boolean,
  [QUANTITY]
>;

export enum FilterTypes {
  eth_newBlockFilter,
  eth_newPendingTransactionFilter,
  eth_newFilter,
}

export type EthGetFilterChanges<
  T extends FilterTypes,
  Pending extends boolean = boolean
> = T extends FilterTypes.eth_newBlockFilter
  ? IJsonRPC<RpcMethodNames.ETH_GET_FILTER_CHANGES, DATA_32B[], [QUANTITY]>
  : T extends FilterTypes.eth_newPendingTransactionFilter
    ? IJsonRPC<RpcMethodNames.ETH_GET_FILTER_CHANGES, DATA_32B[], [QUANTITY]>
    : T extends FilterTypes.eth_newFilter
      ? IJsonRPC<
          RpcMethodNames.ETH_GET_FILTER_CHANGES,
          ILogObject<Pending>[],
          [QUANTITY]
        >
      : never;

export type EthGetFilterLogs<
  T extends FilterTypes,
  Pending extends boolean = boolean
> = T extends FilterTypes.eth_newBlockFilter
  ? IJsonRPC<RpcMethodNames.ETH_GET_FILTER_LOGS, DATA_32B[], [QUANTITY]>
  : T extends FilterTypes.eth_newPendingTransactionFilter
    ? IJsonRPC<RpcMethodNames.ETH_GET_FILTER_LOGS, DATA_32B[], [QUANTITY]>
    : T extends FilterTypes.eth_newFilter
      ? IJsonRPC<
          RpcMethodNames.ETH_GET_FILTER_LOGS,
          ILogObject<Pending>[],
          [QUANTITY]
        >
      : never;

export type EthGetLogs<Pending extends boolean = boolean> = IJsonRPC<
  RpcMethodNames.ETH_GET_LOGS,
  ILogObject<Pending>[],
  [IFilterOptions]
>;

export type EthFilterType<
  T extends FilterTypes = FilterTypes,
  Pending extends boolean = boolean
> =
  | EthNewFilter
  | EthNewBlockFilter
  | EthNewPendingTransactionFilter
  | EthUninstallFilter
  | EthGetFilterChanges<T, Pending>
  | EthGetFilterLogs<T, Pending>
  | EthGetLogs;
