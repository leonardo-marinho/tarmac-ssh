import UserController from '@/server/controllers/User.controller';
import { ControllerMethodsEnum } from '@/server/enum';
import { handleUnsupportedMethod } from '@/server/utils/handleUnsupportedMethod';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === ControllerMethodsEnum.GET) {
    return await UserController.getById(req, res);
  }

  handleUnsupportedMethod(req, res);
};

export default handler;
