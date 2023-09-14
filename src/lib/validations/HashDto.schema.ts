import { object } from 'yup';

import { CreateUserDTO } from '../models/dto/CreateUser.dto';
import { yupHashValueType } from './types/HashValueType.yup';

export const hashDtoSchema = object<CreateUserDTO>({
  hash: yupHashValueType.required(),
});
