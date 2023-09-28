import { CreateGameRoundArgs } from '@/lib/models/dto/CreateGameRoundArgs.dto';
import { object } from 'yup';

import { yupIdValueType } from './types/IdValueType.yup';

export const updateGameRoundArgsSchema = object<CreateGameRoundArgs>({
  gameId: yupIdValueType,
});
