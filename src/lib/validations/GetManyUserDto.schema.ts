import { object, string } from 'yup';

import { CreateUserDTO } from '../models/dto/CreateUser.dto';
import { infinitePaginationValidationSchema } from './InfinitePagination.schema';

export const getManyUserDtoSchema = object<CreateUserDTO>({
  accountHashes: string(),
  ids: string(),
  usernames: string(),
  ...infinitePaginationValidationSchema,
});
