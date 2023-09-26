import { CreateUserArgs } from '@/lib/models/dto/CreateUserArgs.dto';
import { object } from 'yup';

import { yupHashValueType } from './types/HashValueType.yup';

export const hashArgsSchema = object<CreateUserArgs>({
  hash: yupHashValueType.required(),
});
