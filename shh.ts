import { IShhFilter, IShhMessage, IWhisperPostObject } from './interfaces';
import { DATA_60B, IJsonRPC, QUANTITY, RpcMethodNames } from './primitives';

export type ShhPost = IJsonRPC<RpcMethodNames.SHH_POST, string>;

export type ShhVersion = IJsonRPC<
  RpcMethodNames.SHH_VERSION,
  boolean,
  [IWhisperPostObject]
>;

export type ShhNewIdentity = IJsonRPC<
  RpcMethodNames.SHH_NEW_IDENTITY,
  DATA_60B
>;

export type ShhHasIdentity = IJsonRPC<
  RpcMethodNames.SHH_HAS_IDENTITY,
  boolean,
  [DATA_60B]
>;

export type ShhNewGroup = IJsonRPC<RpcMethodNames.SHH_NEW_GROUP, DATA_60B>;

export type ShhAddToGroup = IJsonRPC<
  RpcMethodNames.SHH_ADD_TO_GROUP,
  boolean,
  [DATA_60B]
>;

export type ShhNewFilter<NoReceiver extends boolean = boolean> = IJsonRPC<
  RpcMethodNames.SHH_NEW_FILTER,
  QUANTITY,
  [IShhFilter<NoReceiver>]
>;

export type ShhUninstallFilter = IJsonRPC<
  RpcMethodNames.SHH_UNINSTALL_FILTER,
  boolean,
  [QUANTITY]
>;

export type ShhGetFilterChanges<
  NoReceiver extends boolean = boolean
> = IJsonRPC<
  RpcMethodNames.SHH_GET_FILTER_CHANGES,
  IShhMessage<NoReceiver>,
  [QUANTITY]
>;

export type ShhGetMessages<NoReceiver extends boolean = boolean> = IJsonRPC<
  RpcMethodNames.SHH_GET_MESSAGES,
  IShhMessage<NoReceiver>,
  [QUANTITY]
>;

export type ShhType =
  | ShhPost
  | ShhVersion
  | ShhNewIdentity
  | ShhHasIdentity
  | ShhNewGroup
  | ShhAddToGroup
  | ShhNewFilter
  | ShhUninstallFilter
  | ShhGetFilterChanges
  | ShhGetMessages;
