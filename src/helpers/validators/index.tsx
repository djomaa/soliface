export function addressValidator(value: string): boolean {
  return /^0x[0-9a-f]{40}$/i.test(value);
}

export function hexValidator(value: string): boolean {
  return /^0x[0-9a-f]{0,}$/i.test(value);
}
