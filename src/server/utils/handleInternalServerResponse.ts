import { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrors } from '../constants';
import { HttpResponseCodesEnum } from '../enums';
import { ControllerErrorResponseType } from '../types';

export const handleInternalServerResponse = (
  _: NextApiRequest,
  res: NextApiResponse<ControllerErrorResponseType>,
): void => {
  res.status(HttpResponseCodesEnum.INTERNAL_SERVER_ERROR).json({
    ...ApiErrors.INTERNAL_SERVER_ERROR,
  });
};
