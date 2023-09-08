import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaErrorsEnum } from '../enum';
import { ControllerErrorResponseType } from '../types';
import { Prisma } from '@prisma/client';
import { handleValidationErrorResponse } from './handleValidationErrorResponse';
import { handleUnknownPrismaErrorResponse } from './handleUnknownPrismaErrorResponse';

export const handlePrismaErrorResponse = (
  _: NextApiRequest,
  res: NextApiResponse<ControllerErrorResponseType>,
  error: Prisma.PrismaClientKnownRequestError,
): void => {
  if (error.code === PrismaErrorsEnum.UNIQUE_CONSTRAINT_VALIDATION) {
    handleValidationErrorResponse(_, res, error);
  } else {
    handleUnknownPrismaErrorResponse(_, res, error);
  }
};
