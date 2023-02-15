import Big, { BigSource } from 'big.js';

type Src = BigSource | bigint;
Big.PE = Infinity;

export function parse(value: Src) {
  return Big(value.toString());
}

export function applyDecimals(oValue: Src, oDecimals: Src) {
  const value = parse(oValue);
  const decimals = parse(oDecimals);
  const multiplier = Big(10).pow(decimals.toNumber());
  return value.times(multiplier);
}

export function removeDecimals(oValue: Src, oDecimals: Src) {
  const decimals = parse(oDecimals);
  const value = parse(oValue);
  const divider = Big(10).pow(decimals.toNumber());
  return value.div(divider);
}
