import { mockPrismaClientKnownRequestError } from '@/lib/mocks/PrismaClientKnownRequestError.mock';
import { PrismaErrorsEnum } from '@/server/enums';
import { NotFoundException } from '@/server/exceptions/NotFound.exception';
import { NotTreatedException } from '@/server/exceptions/NotTreated.exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { handlePrismaError } from './handlePrismaError';

describe('handlePrismaError', () => {
  let error: PrismaClientKnownRequestError;

  it('should throw a NotFoundException if the error code is P2025', () => {
    error = mockPrismaClientKnownRequestError(undefined, {
      params: { code: PrismaErrorsEnum.RECORD_NOT_FOUND },
    });
    expect(() => handlePrismaError(error)).toThrowError(NotFoundException);
  });

  it('should throw a InternalServerErrorException if the error code is not treated', () => {
    error = mockPrismaClientKnownRequestError(undefined, {
      params: { code: PrismaErrorsEnum.UNKNOWN },
    });
    expect(() => handlePrismaError(error)).toThrowError(NotTreatedException);
  });
});
