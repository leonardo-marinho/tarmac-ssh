import { ApiException } from './Api';

describe('Api exception', () => {
  it('should have a status code', () => {
    const exception = new ApiException(200, '');
    expect(exception.status).toBe(200);
  });
});
