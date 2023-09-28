import { CreateGameBetArgs } from '@/lib/models/dto/CreateGameBetArgs.dto';
import { object } from 'yup';

import { yupIdValueType } from './types/IdValueType.yup';
import { yupTextBulkValueType } from './types/TextBulkValueType.yup';

export const updateGameBetArgsSchema = object<CreateGameBetArgs>({
  contractHash: yupTextBulkValueType,
  gameRoundId: yupIdValueType,
  userId: yupIdValueType,
});
