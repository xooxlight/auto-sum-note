export function calculateSum(text: string): number {
  if (!text) return 0;
  // Extract all numbers: positive, negative, and decimals
  const regex = /-?\d+(\.\d+)?/g;
  const matches = text.match(regex);
  if (!matches) return 0;

  return matches.reduce((sum, numStr) => {
    const num = parseFloat(numStr);
    return isNaN(num) ? sum : sum + num;
  }, 0);
}

export function getFirstLine(text: string): string {
  if (!text) return 'Empty Note';
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  return lines.length > 0 ? lines[0] : 'Empty Note';
}

export function formatNumber(num: number): string {
  // Use a sensible limit for floating points to avoid weird representation
  return Number(num.toFixed(4)).toString();
}