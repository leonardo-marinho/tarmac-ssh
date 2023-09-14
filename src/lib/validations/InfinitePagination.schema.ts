import { MAX_ITEMS_PER_PAGE, MIN_ITEMS_PER_PAGE } from '@/server/constants';
import { InfinitePaginationDTO } from '@/server/types';
import { number, object } from 'yup';

export const infinitePaginationValidationSchema = object<InfinitePaginationDTO>({
  itemsPerPage: number().max(MAX_ITEMS_PER_PAGE).min(MIN_ITEMS_PER_PAGE),
  page: number().min(0),
});
