import { boolean, object, string } from 'yup';

import { CreateUserDTO } from '../models/dto/CreateUser.dto';

export const updateUserDtoSchema = object<CreateUserDTO>({
  accountHash: string(),
  disabled: boolean(),
  username: string().min(3).max(20),
});
