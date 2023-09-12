import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethodsEnum } from '../enums';
import { ControllerErrorResponseType } from '../types';
import { UnsupportedMethodException } from '../exceptions/UnsupportedMethod.exception';
import { handleApiError } from './handleApiError';

export const handleUnsupportedMethod = (
  req: NextApiRequest,
  res: NextApiResponse<ControllerErrorResponseType>,
): void => {
  handleApiError(
    req,
    res,
    new UnsupportedMethodException(req.method as HttpMethodsEnum, req.url),
  );
};
