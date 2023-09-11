import { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrors } from '../constants';
import { HttpResponseCodesEnum } from '../enums';
import { ControllerErrorResponseType } from '../types';
import { Prisma } from '@prisma/client';

export const handleUnknownPrismaErrorResponse = (
  _: NextApiRequest,
  res: NextApiResponse<ControllerErrorResponseType>,
  error: Prisma.PrismaClientKnownRequestError,
): void => {
  res.status(HttpResponseCodesEnum.INTERNAL_SERVER_ERROR).json({
    ...ApiErrors.INTERNAL_SERVER_ERROR,
    error,
  });
};
