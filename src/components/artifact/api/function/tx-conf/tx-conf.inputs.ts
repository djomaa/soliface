import { GasPriceInput } from './inputs/gas-price.input';
import { TxConfKey } from './types';

export const TxConfInputMap: Partial<Record<TxConfKey, React.FC>> = {
  gasPrice: GasPriceInput,
}
