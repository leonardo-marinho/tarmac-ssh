import type { NextApiRequest, NextApiResponse } from 'next';

import UserController from '@/server/controllers/User.controller';
import { HttpMethodsEnum } from '@/server/enums';
import { handleApiError } from '@/server/utils/handleApiError';
import { handleUnsupportedMethod } from '@/server/utils/handleUnsupportedMethod';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === HttpMethodsEnum.GET) {
      return await UserController.getById(req, res);
    }

    if (req.method === HttpMethodsEnum.DELETE) {
      return await UserController.deleteById(req, res);
    }

    if (req.method === HttpMethodsEnum.PATCH) {
      return await UserController.updateUser(req, res);
    }
  } catch (error) {
    return handleApiError(req, res, error as Error);
  }

  handleUnsupportedMethod(req, res);
};

export default handler;
