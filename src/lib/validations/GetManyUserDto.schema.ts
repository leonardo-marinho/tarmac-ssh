import { object, string } from 'yup';
import { CreateUserDTO } from '../models/dto/CreateUser.dto';
import { infinitePaginationValidationSchema } from './InfinitePagination.schema';

export const getManyUserDtoSchema = object<CreateUserDTO>({
  ids: string(),
  usernames: string(),
  accountHashes: string(),
  ...infinitePaginationValidationSchema,
});
