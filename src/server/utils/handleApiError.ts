import { ApiErrors } from '@/server/constants';
import { HttpResponseCodesEnum } from '@/server/enums';
import { NotFoundException } from '@/server/exceptions/NotFound.exception';
import { NotTreatedException } from '@/server/exceptions/NotTreated.exception';
import { UnauthorizedException } from '@/server/exceptions/Unauthorized.exception';
import { UnsupportedMethodException } from '@/server/exceptions/UnsupportedMethod.exception';
import { ValidationException } from '@/server/exceptions/Validation.exception';
import { ControllerErrorResponseType } from '@/server/types';
import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { handlePrismaError } from './handlePrismaError';

export const handleApiError = (
  _: NextApiRequest,
  res: NextApiResponse<ControllerErrorResponseType>,
  error: Error,
): void => {
  const message = error.message;
  try {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaError(error);
    }
  } catch (e) {
    error = e as Error;
  }

  if (error instanceof UnsupportedMethodException) {
    res.status(HttpResponseCodesEnum.METHOD_NOT_ALLOWED).json({
      ...ApiErrors.METHOD_NOT_ALLOWED,
      message,
    });
  } else if (error instanceof ValidationException) {
    res.status(HttpResponseCodesEnum.BAD_REQUEST).json({
      ...ApiErrors.VALIDATION_ERROR,
      message,
    });
  } else if (error instanceof NotFoundException) {
    res.status(HttpResponseCodesEnum.NOT_FOUND).json({
      ...ApiErrors.NOT_FOUND,
      message,
    });
  } else if (error instanceof NotTreatedException) {
    res.status(HttpResponseCodesEnum.INTERNAL_SERVER_ERROR).json({
      ...ApiErrors.NOT_TREATED,
      message,
    });
  } else if (error instanceof UnauthorizedException) {
    res.status(HttpResponseCodesEnum.UNAUTHORIZED).json({
      ...ApiErrors.UNAUTHORIZED,
      message,
    });
  } else {
    res.status(HttpResponseCodesEnum.INTERNAL_SERVER_ERROR).json({
      ...ApiErrors.INTERNAL_SERVER_ERROR,
      message,
    });
  }
};
