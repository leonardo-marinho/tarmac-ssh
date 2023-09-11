import { handleNotFoundResponse } from './handleNotFoundResponse';
import { mockNextApiResponse } from '@/lib/mocks/NextApiResponse.mock';
import { NextApiRequest, NextApiResponse } from 'next';
import { HttpResponseCodesEnum } from '../enums';
import { ApiErrors } from '../constants';

describe('handleNotFoundResponse', () => {
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
    handleNotFoundResponse(mockedNextApiRequest, mockedNextApiResponse);
    expect(mockedNextApiResponse.status).toHaveBeenCalledWith(
      HttpResponseCodesEnum.NOT_FOUND,
    );
  });

  it('should return with message', () => {
    handleNotFoundResponse(mockedNextApiRequest, mockedNextApiResponse);
    expect(mockedNextApiResponseJsonFn).toHaveBeenCalledWith(
      ApiErrors.NOT_FOUND,
    );
  });
});
