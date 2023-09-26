import type { NextApiRequest, NextApiResponse } from 'next';

import { HttpMethodsEnum } from '@/server/enums';
import { handleApiError } from '@/server/utils/handleApiError';
import { handleUnsupportedMethod } from '@/server/utils/handleUnsupportedMethod';
import UserTransactionController from '@/server/controllers/UserTransaction.controller';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === HttpMethodsEnum.GET) {
      return await UserTransactionController.getByHash(req, res);
    }
  } catch (error) {
    return handleApiError(req, res, error as Error);
  }

  handleUnsupportedMethod(req, res);
};

export default handler;