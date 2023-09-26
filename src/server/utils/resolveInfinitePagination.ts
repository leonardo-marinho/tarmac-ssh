import { DEFAULT_ITEMS_PER_PAGE } from '@/server/constants';
import { InfinitePaginationDTO, InfinitePaginationType } from '@/server/types';

export const resolveInfinitePagination = (raw: InfinitePaginationDTO): InfinitePaginationType => {
  const page = Number(raw.page) || 1;
  const itemsPerPage = Number(raw.itemsPerPage) || DEFAULT_ITEMS_PER_PAGE;

  return {
    itemsPerPage,
    page,
  };
};
