export function calculateSum(text: string): number {
  if (!text) return 0;

  // Extract positive, negative, and decimal numbers
  const regex = /-?\d[\d,]*(?:\.\d+)?/g;
  let total = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const numStr = match[0];
    const start = match.index;
    const end = start + numStr.length;

    const before = text[start - 1] ?? '';
    const after = text[end] ?? '';

    // Exclude numbers preceded by a non-whitespace character
    if (before && !/\s/.test(before)) {
      continue;
    }

    // Allow numbers followed by supported currency units
    const isPriceUnit = /^(원|달러|만원|천원)/.test(text.slice(end));

    // Exclude numbers followed by a non-whitespace character unless it is a currency unit
    if (after && !/\s/.test(after) && !isPriceUnit) {
      continue;
    }

    // Remove commas and convert the string to a number
    const num = Number(numStr.replace(/,/g, ''));

    if (Number.isFinite(num)) {
      total += num;
    }
  }

  return total;
}

export function getFirstLine(text: string): string {
  if (!text) return 'Empty Note';
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  return lines.length > 0 ? lines[0] : 'Empty Note';
}

export function formatNumber(num: number): string {
  // Limit decimal precision and add thousand separators
  return Number(num.toFixed(4)).toLocaleString('en-US', {
    maximumFractionDigits: 4,
  });
}
