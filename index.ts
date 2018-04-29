export * from './core';
export * from './compilers';
export * from './db';
export * from './interfaces';
export * from './filters';
export * from './get-block-by';
export * from './get-count';
export * from './get-transaction';
export * from './mining';
export * from './primitives';
export * from './shh';
export * from './web3';

import { EthCoreType } from './core';
import { EthCompilerType } from './compilers';
import { EthDBTypes } from './db';
import { EthFilterType } from './filters';
import { EthGetBlockByType } from './get-block-by';
import { EthGetCountType } from './get-count';
import { EthGetTransactionType } from './get-transaction';
import { EthMiningType } from './mining';
export type EthType =
  | EthCoreType
  | EthCompilerType
  | EthDBTypes
  | EthFilterType
  | EthGetBlockByType
  | EthGetCountType
  | EthGetTransactionType
  | EthMiningType;
