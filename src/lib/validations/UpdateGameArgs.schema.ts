import { CreateGameArgs } from '@/lib/models/dto/CreateGameArgs.dto';
import { object } from 'yup';

import { yupTextBulkValueType } from './types/TextBulkValueType.yup';

export const updateGameArgsSchema = object<CreateGameArgs>({
  name: yupTextBulkValueType,
});
