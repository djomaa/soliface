export function cutAddress(v: string) {
  const parts = [
    v.substring(0, 6),
    '...',
    v.substring(v.length - 4),
  ]
  return parts.join('');
}
