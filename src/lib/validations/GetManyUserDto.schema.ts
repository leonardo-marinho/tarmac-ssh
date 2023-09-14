import { boolean, object } from 'yup';

import { CreateUserDTO } from '../models/dto/CreateUser.dto';
import { infinitePaginationValidationSchema } from './InfinitePagination.schema';
import { yupNumberBulkValueType } from './types/NumberBulkValueType.yup';
import { yupTextBulkValueType } from './types/TextBulkValueType.yup';

export const getManyUserDtoSchema = object<CreateUserDTO>({
  accountHashes: yupTextBulkValueType,
  disabled: boolean(),
  ids: yupNumberBulkValueType,
  usernames: yupTextBulkValueType,
}).concat(infinitePaginationValidationSchema);
