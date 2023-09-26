import { HttpMethodsEnum } from '@/server/enums';
import { UnsupportedMethodException } from '@/server/exceptions/UnsupportedMethod.exception';
import { ControllerErrorResponseType } from '@/server/types';
import { NextApiRequest, NextApiResponse } from 'next';

import { handleApiError } from './handleApiError';

export const handleUnsupportedMethod = (
  req: NextApiRequest,
  res: NextApiResponse<ControllerErrorResponseType>,
): void => {
  handleApiError(req, res, new UnsupportedMethodException(req.method as HttpMethodsEnum, req.url));
};
