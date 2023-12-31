import { InfinitePaginationType } from '@/server/types';

export const resolvePrismaPaginationArgs = (pagination: InfinitePaginationType) => {
  return {
    skip: (pagination.page - 1) * pagination.itemsPerPage,
    take: pagination.itemsPerPage + 1,
  };
};
