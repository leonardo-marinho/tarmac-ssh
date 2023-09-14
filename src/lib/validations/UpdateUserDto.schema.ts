import { boolean, object } from 'yup';

import { CreateUserDTO } from '../models/dto/CreateUser.dto';
import { yupHashValueType } from './types/HashValueType.yup';
import { yupUsernameValueType } from './types/UsernameValueType.yup';

export const updateUserDtoSchema = object<CreateUserDTO>({
  accountHash: yupHashValueType,
  disabled: boolean(),
  username: yupUsernameValueType,
});
