import UserController from '@/server/controllers/User.controller';
import { ControllerMethodsEnum } from '@/server/enums';
import { handleUnsupportedMethod } from '@/server/utils/handleUnsupportedMethod';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === ControllerMethodsEnum.POST) {
    return await UserController.create(req, res);
  }

  if (req.method === ControllerMethodsEnum.GET) {
    return await UserController.findMany(req, res);
  }

  handleUnsupportedMethod(req, res);
};

export default handler;
