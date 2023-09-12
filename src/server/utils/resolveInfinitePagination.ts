import { DEFAULT_ITEMS_PER_PAGE } from '../constants';
import { InfinitePaginationDTO, InfinitePaginationType } from '../types';

export const resolveInfinitePagination = (raw: InfinitePaginationDTO): InfinitePaginationType => {
  const page = Number(raw.page) || 1;
  const itemsPerPage = Number(raw.itemsPerPage) || DEFAULT_ITEMS_PER_PAGE;

  return {
    itemsPerPage,
    page,
  };
};
