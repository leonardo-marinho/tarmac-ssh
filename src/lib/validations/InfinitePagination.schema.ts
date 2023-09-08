import { number } from 'yup';

export const InfinitePaginationValidationSchema = {
  page: number(),
  itemsPerPage: number().max(50),
};
