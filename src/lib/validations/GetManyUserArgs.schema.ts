import { CreateUserArgs } from '@/lib/models/dto/CreateUserArgs.dto';
import { boolean, object } from 'yup';

import { infinitePaginationValidationSchema } from './InfinitePagination.schema';
import { yupNumberBulkValueType } from './types/NumberBulkValueType.yup';
import { yupTextBulkValueType } from './types/TextBulkValueType.yup';

export const getManyUserArgsSchema = object<CreateUserArgs>({
  disabled: boolean(),
  hashes: yupTextBulkValueType,
  ids: yupNumberBulkValueType,
  usernames: yupTextBulkValueType,
}).concat(infinitePaginationValidationSchema);
