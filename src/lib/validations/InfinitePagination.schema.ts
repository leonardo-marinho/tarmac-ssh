import { number } from 'yup';

export const infinitePaginationValidationSchema = {
  page: number(),
  itemsPerPage: number().max(50),
};
