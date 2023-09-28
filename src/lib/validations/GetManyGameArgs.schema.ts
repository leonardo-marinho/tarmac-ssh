import { CreateGameArgs } from '@/lib/models/dto/CreateGameArgs.dto';
import { object } from 'yup';

import { infinitePaginationValidationSchema } from './InfinitePagination.schema';
import { yupNumberBulkValueType } from './types/NumberBulkValueType.yup';
import { yupTextBulkValueType } from './types/TextBulkValueType.yup';

export const getManyGameArgsSchema = object<CreateGameArgs>({
  ids: yupNumberBulkValueType,
  names: yupTextBulkValueType,
}).concat(infinitePaginationValidationSchema);
