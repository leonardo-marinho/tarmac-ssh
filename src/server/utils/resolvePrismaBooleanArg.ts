export const resolvePrismaBooleanArg = (arg: string | undefined): boolean | undefined => {
  if (arg === 'true') {
    return true;
  }

  if (arg === 'false') {
    return false;
  }

  return undefined;
};
