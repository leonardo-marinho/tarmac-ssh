import { AuthSignUpArgs } from '@/lib/models/dto/AuthSignUpArgs.dto';
import { object } from 'yup';

import { yupHashValueType } from './types/HashValueType.yup';
import { yupUsernameValueType } from './types/UsernameValueType.yup';

export const authSignUpArgsSchema = object<AuthSignUpArgs>({
  hash: yupHashValueType.required(),
  username: yupUsernameValueType,
});
