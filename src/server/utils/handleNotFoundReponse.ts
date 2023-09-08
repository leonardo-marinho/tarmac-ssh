import { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrors } from '../constants';
import { HttpResponseCodesEnum } from '../enum';
import { ControllerErrorResponseType } from '../types';

export const handleNotFoundResponse = (
  _: NextApiRequest,
  res: NextApiResponse<ControllerErrorResponseType>,
): void => {
  res.status(HttpResponseCodesEnum.NOT_FOUND).json({
    ...ApiErrors.NOT_FOUND,
  });
};
