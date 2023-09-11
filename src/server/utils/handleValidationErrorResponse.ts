import { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrors } from '../constants';
import { HttpResponseCodesEnum } from '../enums';
import { ControllerErrorResponseType } from '../types';
import { AnyObject } from 'yup';

export const handleValidationErrorResponse = (
  _: NextApiRequest,
  res: NextApiResponse<ControllerErrorResponseType>,
  error?: AnyObject,
): void => {
  res.status(HttpResponseCodesEnum.BAD_REQUEST).json({
    ...ApiErrors.VALIDATION_ERROR,
    error,
  });
};
