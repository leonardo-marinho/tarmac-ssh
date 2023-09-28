import { CreateGameBetArgs } from '@/lib/models/dto/CreateGameBetArgs.dto';
import { yupTextBulkValueType } from '@/lib/validations/types/TextBulkValueType.yup';
import { object } from 'yup';

import { infinitePaginationValidationSchema } from './InfinitePagination.schema';
import { yupNumberBulkValueType } from './types/NumberBulkValueType.yup';

export const getManyGameBetArgsSchema = object<CreateGameBetArgs>({
  contractHashes: yupTextBulkValueType,
  gameRoundIds: yupNumberBulkValueType,
  ids: yupNumberBulkValueType,
  userIds: yupNumberBulkValueType,
}).concat(infinitePaginationValidationSchema);
