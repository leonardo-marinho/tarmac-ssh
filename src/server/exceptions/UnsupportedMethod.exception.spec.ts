import { HttpMethodsEnum } from '../enums';
import { UnsupportedMethodException } from './UnsupportedMethod.exception';

describe('UnsupportedMethod exception', () => {
  it('should handle undefined endpoint', () => {
    const exception = new UnsupportedMethodException(HttpMethodsEnum.GET, undefined);
    expect(exception.message).toBe('Method GET not allowed for this endpoint');
  });
});
