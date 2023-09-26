export const isStrictNullOrUndefined = <TValue>(value: null | TValue | undefined) => {
  return value === null || value === undefined;
};
