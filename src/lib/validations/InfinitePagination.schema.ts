import { number } from 'yup';

export const infinitePaginationValidationSchema = {
  itemsPerPage: number().max(50),
  page: number(),
};
