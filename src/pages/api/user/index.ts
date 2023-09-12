import type { NextApiRequest, NextApiResponse } from 'next';

import UserController from '@/server/controllers/User.controller';
import { HttpMethodsEnum } from '@/server/enums';
import { handleApiError } from '@/server/utils/handleApiError';
import { handleUnsupportedMethod } from '@/server/utils/handleUnsupportedMethod';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === HttpMethodsEnum.POST) {
      return await UserController.create(req, res);
    }

    if (req.method === HttpMethodsEnum.GET) {
      return await UserController.getMany(req, res);
    }
  } catch (error) {
    return handleApiError(req, res, error as Error);
  }

  handleUnsupportedMethod(req, res);
};

export default handler;
