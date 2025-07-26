export function parseSafeCommand(comment: string) {
  const match = comment.match(/\/safe send ([\d.]+) ETH to (0x[a-fA-F0-9]{40})/);
  if (!match) return null;

  const amount = match[1];
  const to = match[2];

  return {
    to,
    value: (parseFloat(amount) * 1e18).toString(),
    data: '0x',
  };
}
