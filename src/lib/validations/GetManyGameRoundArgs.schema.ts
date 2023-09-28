import { CreateGameRoundArgs } from '@/lib/models/dto/CreateGameRoundArgs.dto';
import { yupTextBulkValueType } from '@/lib/validations/types/TextBulkValueType.yup';
import { object } from 'yup';

import { infinitePaginationValidationSchema } from './InfinitePagination.schema';
import { yupNumberBulkValueType } from './types/NumberBulkValueType.yup';

export const getManyGameRoundArgsSchema = object<CreateGameRoundArgs>({
  gameIds: yupNumberBulkValueType,
  ids: yupNumberBulkValueType,
  status: yupTextBulkValueType,
}).concat(infinitePaginationValidationSchema);
