import { handleUnknownPrismaErrorResponse } from './handleUnknownPrismaErrorResponse';
import { mockNextApiResponse } from '@/lib/mocks/NextApiResponse.mock';
import { NextApiRequest, NextApiResponse } from 'next';
import { HttpResponseCodesEnum } from '../enums';
import { ApiErrors } from '../constants';
import { mockPrismaClientKnownRequestError } from '@/lib/mocks/PrismaClientKnownRequestError.mock';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

describe('handleUnknownPrismaErrorResponse', () => {
  const mockedNextApiResponseJsonFn = jest.fn();
  const mockedNextApiRequest: NextApiRequest = {} as NextApiRequest;
  let mockedNextApiResponse: NextApiResponse;
  let mockedPrismaError: PrismaClientKnownRequestError;

  beforeEach(() => {
    mockedNextApiResponse = mockNextApiResponse(
      {},
      { status: mockedNextApiResponseJsonFn },
    ) as NextApiResponse;
    mockedPrismaError = mockPrismaClientKnownRequestError();
  });

  it('should return 500 status code', () => {
    handleUnknownPrismaErrorResponse(
      mockedNextApiRequest,
      mockedNextApiResponse,
      mockedPrismaError,
    );
    expect(mockedNextApiResponse.status).toHaveBeenCalledWith(
      HttpResponseCodesEnum.INTERNAL_SERVER_ERROR,
    );
  });

  it('should return with message', () => {
    handleUnknownPrismaErrorResponse(
      mockedNextApiRequest,
      mockedNextApiResponse,
      mockedPrismaError,
    );
    expect(mockedNextApiResponseJsonFn).toHaveBeenCalledWith({
      ...ApiErrors.INTERNAL_SERVER_ERROR,
      error: mockedPrismaError,
    });
  });
});
