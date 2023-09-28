import { CreateGameRoundArgs } from '@/lib/models/dto/CreateGameRoundArgs.dto';
import { object } from 'yup';

import { infinitePaginationValidationSchema } from './InfinitePagination.schema';
import { yupNumberBulkValueType } from './types/NumberBulkValueType.yup';

export const getManyGameRoundArgsSchema = object<CreateGameRoundArgs>({
  gameIds: yupNumberBulkValueType,
  ids: yupNumberBulkValueType,
}).concat(infinitePaginationValidationSchema);
