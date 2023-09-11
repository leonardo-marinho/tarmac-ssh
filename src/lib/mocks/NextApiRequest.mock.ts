import { NextApiRequest } from 'next';
import { mockDeep } from 'jest-mock-extended';

export const mockNextApiRequest = (
  value?: Partial<NextApiRequest>,
): NextApiRequest => ({
  ...mockDeep<NextApiRequest>(),
  ...value,
});
