import { resolvePrismaBooleanArg } from './resolvePrismaBooleanArg';

describe('resolvePrismaBooleanArg', () => {
  it('should return undefined if value is undefined', () => {
    expect(resolvePrismaBooleanArg(undefined)).toBe(undefined);
  });

  it('should return true if value is "true"', () => {
    expect(resolvePrismaBooleanArg('true')).toBe(true);
  });

  it('should return false if value is "false"', () => {
    expect(resolvePrismaBooleanArg('false')).toBe(false);
  });
});
