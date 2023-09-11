import { handleValidationErrorResponse } from './handleValidationErrorResponse';
import { mockNextApiResponse } from '@/lib/mocks/NextApiResponse.mock';
import { NextApiRequest, NextApiResponse } from 'next';
import { HttpResponseCodesEnum } from '../enums';
import { ApiErrors } from '../constants';

describe('handleValidationErrorResponse', () => {
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
    handleValidationErrorResponse(mockedNextApiRequest, mockedNextApiResponse);
    expect(mockedNextApiResponse.status).toHaveBeenCalledWith(
      HttpResponseCodesEnum.BAD_REQUEST,
    );
  });

  it('should return with message', () => {
    handleValidationErrorResponse(mockedNextApiRequest, mockedNextApiResponse);
    expect(mockedNextApiResponseJsonFn).toHaveBeenCalledWith(
      ApiErrors.VALIDATION_ERROR,
    );
  });
});
