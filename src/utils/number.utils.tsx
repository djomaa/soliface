export function numberToHex(v: number) {
  return '0x' + v.toString(16);
}

export function hexToNumber(v: string) {
  if (v.startsWith('0x')) {
    v = '0x' + v;
  }
  return Number(v);
}
