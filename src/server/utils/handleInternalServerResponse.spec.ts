import { handleInternalServerResponse } from './handleInternalServerResponse';
import { mockNextApiResponse } from '@/lib/mocks/NextApiResponse.mock';
import { NextApiRequest, NextApiResponse } from 'next';
import { HttpResponseCodesEnum } from '../enums';
import { ApiErrors } from '../constants';

describe('handleInternalServerResponse', () => {
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
    handleInternalServerResponse(mockedNextApiRequest, mockedNextApiResponse);
    expect(mockedNextApiResponse.status).toHaveBeenCalledWith(
      HttpResponseCodesEnum.INTERNAL_SERVER_ERROR,
    );
  });

  it('should return with message', () => {
    handleInternalServerResponse(mockedNextApiRequest, mockedNextApiResponse);
    expect(mockedNextApiResponseJsonFn).toHaveBeenCalledWith(
      ApiErrors.INTERNAL_SERVER_ERROR,
    );
  });
});
