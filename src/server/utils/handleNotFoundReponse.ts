import { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrors } from '../constants';
import { HttpResponseCodesEnum } from '../enum';
import { ControllerErrorResponseType } from '../types';
import { AnyObject } from 'yup';

export const handleNotFoundResponse = (
  _: NextApiRequest,
  res: NextApiResponse<ControllerErrorResponseType>,
  error?: AnyObject,
): void => {
  res.status(HttpResponseCodesEnum.NOT_FOUND).json({
    ...ApiErrors.NOT_FOUND,
    error,
  });
};
