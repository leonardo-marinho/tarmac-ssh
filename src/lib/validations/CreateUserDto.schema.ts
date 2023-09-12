import { object, string } from 'yup';

import { CreateUserDTO } from '../models/dto/CreateUser.dto';

export const createUserDtoSchema = object<CreateUserDTO>({
  accountHash: string().required(),
  username: string().required().min(3).max(20),
});
