import { array, number, object, string } from 'yup';
import { CreateUserDTO } from '../models/dto/CreateUser.dto';
import { InfinitePaginationValidationSchema } from './InfinitePagination.schema';

export const FindManyUserDtoSchema = object<CreateUserDTO>({
  ids: string(),
  usernames: string(),
  accountHashes: string(),
  ...InfinitePaginationValidationSchema,
});
