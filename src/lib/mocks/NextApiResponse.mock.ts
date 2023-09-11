import { NextApiResponse } from 'next';
import { mockDeep } from 'jest-mock-extended';

interface NextApiResponseMockOptions {
  status?: () => void;
}

export const mockNextApiResponse = (
  value?: Partial<NextApiResponse>,
  options?: NextApiResponseMockOptions,
): NextApiResponse => ({
  ...mockDeep<NextApiResponse>(),
  status: jest.fn(() => ({
    json: options?.status || jest.fn(),
  })) as unknown as () => NextApiResponse,
  ...value,
});
