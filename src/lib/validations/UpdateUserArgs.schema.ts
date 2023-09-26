import { CreateUserArgs } from '@/lib/models/dto/CreateUserArgs.dto';
import { boolean, object } from 'yup';

import { yupHashValueType } from './types/HashValueType.yup';
import { yupUsernameValueType } from './types/UsernameValueType.yup';

export const updateUserArgsSchema = object<CreateUserArgs>({
  disabled: boolean(),
  hash: yupHashValueType,
  username: yupUsernameValueType,
});
