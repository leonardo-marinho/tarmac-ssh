import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaErrorsEnum } from '../enums';
import { ControllerErrorResponseType } from '../types';
import { Prisma } from '@prisma/client';
import { handleValidationErrorResponse } from './handleValidationErrorResponse';
import { handleUnknownPrismaErrorResponse } from './handleUnknownPrismaErrorResponse';
import { handleNotFoundResponse } from './handleNotFoundResponse';

export const handlePrismaErrorResponse = (
  _: NextApiRequest,
  res: NextApiResponse<ControllerErrorResponseType>,
  error: Prisma.PrismaClientKnownRequestError,
): void => {
  if (error.code === PrismaErrorsEnum.UNIQUE_CONSTRAINT_VALIDATION) {
    handleValidationErrorResponse(_, res, error);
  } else if (error.code === PrismaErrorsEnum.RECORD_NOT_FOUND) {
    handleNotFoundResponse(_, res, error);
  } else {
    handleUnknownPrismaErrorResponse(_, res, error);
  }
};
