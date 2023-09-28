import type { NextApiRequest, NextApiResponse } from 'next';

import GameController from '@/server/controllers/Game.controller';
import { HttpMethodsEnum } from '@/server/enums';
import { handleApiError } from '@/server/utils/handleApiError';
import { handleUnsupportedMethod } from '@/server/utils/handleUnsupportedMethod';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === HttpMethodsEnum.POST) {
      return await GameController.create(req, res);
    }

    if (req.method === HttpMethodsEnum.GET) {
      return await GameController.getMany(req, res);
    }
  } catch (error) {
    return handleApiError(req, res, error as Error);
  }

  handleUnsupportedMethod(req, res);
};

export default handler;
