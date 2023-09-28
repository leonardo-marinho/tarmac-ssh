import { CreateGameRoundArgs } from '@/lib/models/dto/CreateGameRoundArgs.dto';
import { yupTextBulkValueType } from '@/lib/validations/types/TextBulkValueType.yup';
import { object } from 'yup';

import { yupIdValueType } from './types/IdValueType.yup';

export const updateGameRoundArgsSchema = object<CreateGameRoundArgs>({
  gameId: yupIdValueType,
  status: yupTextBulkValueType,
});
