import { GasPriceInput } from './custom-inputs/gas-price/gas-price.input';
import { TxConfKey } from './types';

export const TxConfInputMap: Partial<Record<TxConfKey, React.FC>> = {
  gasPrice: GasPriceInput,
}
