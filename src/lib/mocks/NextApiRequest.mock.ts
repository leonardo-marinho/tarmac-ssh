import { mockDeep } from 'jest-mock-extended';
import { NextApiRequest } from 'next';

export const mockNextApiRequest = (value?: Partial<NextApiRequest>): NextApiRequest => ({
  ...mockDeep<NextApiRequest>(),
  ...value,
});
