import { AbiItem } from 'types/abi';
import { Ownable } from './ownable';
import { Erc20 } from './erc20';

export const DefaultAbi: Record<string, AbiItem[]> = { Erc20, Ownable };
