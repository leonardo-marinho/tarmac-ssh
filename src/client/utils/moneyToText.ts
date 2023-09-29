export const moneyToText = (value: number | undefined, symbol: string, fixed = 2) => {
  return `${symbol} ${(value || 0).toFixed(fixed)}`;
};
