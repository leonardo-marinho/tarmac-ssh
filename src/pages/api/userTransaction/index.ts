import type { NextApiRequest, NextApiResponse } from 'next';

import { HttpMethodsEnum } from '@/server/enums';
import { handleApiError } from '@/server/utils/handleApiError';
import { handleUnsupportedMethod } from '@/server/utils/handleUnsupportedMethod';
import UserTransactionController from '@/server/controllers/UserTransaction.controller';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === HttpMethodsEnum.POST) {
      return await UserTransactionController.create(req, res);
    }

    if (req.method === HttpMethodsEnum.GET) {
      if (req.query.type === 'totalAmountByUser') {
        return await UserTransactionController.getTotalAmountByUser(req, res);
      } else if (req.query.userId) {
        return await UserTransactionController.getTotalAmountBySingleUser(req, res);
      } else {
        return await UserTransactionController.getMany(req, res);
      }
    }
    // if (req.method === HttpMethodsEnum.GET) {
    //   return await UserTransactionController.getMany(req, res);
    // }
  } catch (error) {
    return handleApiError(req, res, error as Error);
  }

  handleUnsupportedMethod(req, res);
};

export default handler;