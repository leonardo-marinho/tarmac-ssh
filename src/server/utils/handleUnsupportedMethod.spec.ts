import { handleUnsupportedMethod } from './handleUnsupportedMethod';
import { mockNextApiResponse } from '@/lib/mocks/NextApiResponse.mock';
import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethodsEnum, HttpResponseCodesEnum } from '../enums';
import { ApiErrors } from '../constants';

describe('handleUnsupportedMethod', () => {
  const mockedNextApiResponseJsonFn = jest.fn();
  const mockedNextApiRequest: NextApiRequest = {} as NextApiRequest;
  let mockedNextApiResponse: NextApiResponse;

  beforeEach(() => {
    mockedNextApiResponse = mockNextApiResponse(
      {},
      { status: mockedNextApiResponseJsonFn },
    ) as NextApiResponse;
  });

  it('should return 500 status code', () => {
    handleUnsupportedMethod(mockedNextApiRequest, mockedNextApiResponse);
    expect(mockedNextApiResponse.status).toHaveBeenCalledWith(
      HttpResponseCodesEnum.METHOD_NOT_ALLOWED,
    );
  });

  it('should return with message', () => {
    mockedNextApiRequest.method = HttpMethodsEnum.GET;
    mockedNextApiRequest.url = '/';
    handleUnsupportedMethod(mockedNextApiRequest, mockedNextApiResponse);
    expect(mockedNextApiResponseJsonFn).toHaveBeenCalledWith({
      ...ApiErrors.METHOD_NOT_ALLOWED,
      message: `Method GET not allowed for / endpoint`,
    });
  });
});
