import { UnsupportedMethodException } from './UnsupportedMethod.exception';
import { HttpMethodsEnum } from '../enums';

describe('UnsupportedMethod exception', () => {
  it('should handle undefined endpoint', () => {
    const exception = new UnsupportedMethodException(
      HttpMethodsEnum.GET,
      undefined,
    );
    expect(exception.message).toBe('Method GET not allowed for this endpoint');
  });
});
