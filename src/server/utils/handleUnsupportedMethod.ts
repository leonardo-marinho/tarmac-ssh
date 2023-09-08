import { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrors } from '../constants';
import { HttpResponseCodesEnum } from '../enum';
import { ControllerErrorResponseType } from '../types';

export const handleUnsupportedMethod = (
  _: NextApiRequest,
  res: NextApiResponse<ControllerErrorResponseType>,
): void => {
  res.status(HttpResponseCodesEnum.METHOD_NOT_ALLOWED).json({
    ...ApiErrors.METHOD_NOT_ALLOWED,
  });
};
