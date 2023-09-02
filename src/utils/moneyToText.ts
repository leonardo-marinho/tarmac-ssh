export const moneyToText = (value: number, symbol: string, fixed = 2) => {
  return `${symbol}${value.toFixed(fixed)}`;
};
