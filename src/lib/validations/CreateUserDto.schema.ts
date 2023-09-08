import { object, string } from 'yup';
import { CreateUserDTO } from '../models/dto/CreateUser.dto';

export const createUserDtoSchema = object<CreateUserDTO>({
  username: string().required().min(3).max(20),
  accountHash: string().required(),
});
