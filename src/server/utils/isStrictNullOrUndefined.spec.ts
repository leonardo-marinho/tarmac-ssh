import { isStrictNullOrUndefined } from './isStrictNullOrUndefined';

describe('isStrictNullOrUndefined', () => {
  it('should return true if value is null', () => {
    expect(isStrictNullOrUndefined(null)).toBe(true);
  });

  it('should return true if value is undefined', () => {
    expect(isStrictNullOrUndefined(undefined)).toBe(true);
  });

  it('should return false if value is not null or undefined', () => {
    expect(isStrictNullOrUndefined(0)).toBe(false);
    expect(isStrictNullOrUndefined('')).toBe(false);
    expect(isStrictNullOrUndefined(false)).toBe(false);
    expect(isStrictNullOrUndefined({})).toBe(false);
    expect(isStrictNullOrUndefined([])).toBe(false);
    expect(isStrictNullOrUndefined(() => {})).toBe(false);
  });
});
