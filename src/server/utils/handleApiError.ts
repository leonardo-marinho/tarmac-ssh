import { NextApiRequest, NextApiResponse } from 'next';

import { ApiErrors } from '../constants';
import { HttpResponseCodesEnum } from '../enums';
import { NotFoundException } from '../exceptions/NotFound.exception';
import { UnsupportedMethodException } from '../exceptions/UnsupportedMethod.exception';
import { ValidationException } from '../exceptions/Validation.exception';
import { ControllerErrorResponseType } from '../types';

export const handleApiError = (
  _: NextApiRequest,
  res: NextApiResponse<ControllerErrorResponseType>,
  error: Error,
): void => {
  const message = error.message;

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
  } else {
    res.status(HttpResponseCodesEnum.INTERNAL_SERVER_ERROR).json({
      ...ApiErrors.INTERNAL_SERVER_ERROR,
      message,
    });
  }
};
