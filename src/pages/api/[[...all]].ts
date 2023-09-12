import { handleUnsupportedMethod } from '@/server/utils/handleUnsupportedMethod';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  handleUnsupportedMethod(req, res);
};

export default handler;
