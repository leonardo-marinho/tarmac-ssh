import { InfinitePaginationType } from '../types';

export const resolvePrismaPaginationArgs = (
  pagination: InfinitePaginationType,
) => {
  return {
    take: pagination.page * pagination.itemsPerPage + 1,
    skip: (pagination.page - 1) * pagination.itemsPerPage,
  };
};
