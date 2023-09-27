import { object, string } from 'yup';

import { CreateUserTransactionArgsDto } from '../models/dto/CreateUserTransactionArgs.dto';
import { infinitePaginationValidationSchema } from './InfinitePagination.schema';

export const getManyUserTransactionArgsSchema = object<CreateUserTransactionArgsDto>({
  amount: string(),
  hashes: string(),
  ids: string(),
  userId: string(),
  ...infinitePaginationValidationSchema,
});
