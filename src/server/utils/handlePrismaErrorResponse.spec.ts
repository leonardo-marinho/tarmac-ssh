import { mockNextApiResponse } from '@/lib/mocks/NextApiResponse.mock';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaErrorsEnum } from '../enums';
import { handleUnknownPrismaErrorResponse } from './handleUnknownPrismaErrorResponse';
import { handleNotFoundResponse } from './handleNotFoundResponse';
import { handleValidationErrorResponse } from './handleValidationErrorResponse';
import { handlePrismaErrorResponse } from './handlePrismaErrorResponse';
import { mockPrismaClientKnownRequestError } from '@/lib/mocks/PrismaClientKnownRequestError.mock';

jest.mock('./handleUnknownPrismaErrorResponse');
const mockedHandleUnknownPrismaErrorResponse =
  handleUnknownPrismaErrorResponse as jest.Mock;

jest.mock('./handleValidationErrorResponse');
const mockedHandleValidationErrorResponse =
  handleValidationErrorResponse as jest.Mock;

jest.mock('./handleNotFoundResponse');
const mockedHandleNotFoundResponse = handleNotFoundResponse as jest.Mock;

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

  it('should call mockedHandleUnknownPrismaErrorResponse if error is unknown', () => {
    handlePrismaErrorResponse(
      mockedNextApiRequest,
      mockedNextApiResponse,
      mockPrismaClientKnownRequestError(undefined, {
        params: { code: PrismaErrorsEnum.UNKNOWN },
      }),
    );
    expect(mockedHandleUnknownPrismaErrorResponse).toHaveBeenCalled();
  });

  it('should call handleValidationErrorResponse if error is UNIQUE_CONSTRAINT_VALIDATION', () => {
    handlePrismaErrorResponse(
      mockedNextApiRequest,
      mockedNextApiResponse,
      mockPrismaClientKnownRequestError(undefined, {
        params: { code: PrismaErrorsEnum.UNIQUE_CONSTRAINT_VALIDATION },
      }),
    );
    expect(mockedHandleValidationErrorResponse).toHaveBeenCalled();
  });

  it('should call handleNotFoundResponse if error is RECORD_NOT_FOUND', () => {
    handlePrismaErrorResponse(
      mockedNextApiRequest,
      mockedNextApiResponse,
      mockPrismaClientKnownRequestError(undefined, {
        params: { code: PrismaErrorsEnum.RECORD_NOT_FOUND },
      }),
    );
    expect(mockedHandleNotFoundResponse).toHaveBeenCalled();
  });
});
