import { object, string } from 'yup';
import { CreateUserDTO } from '../models/dto/CreateUser.dto';

export const hashDtoSchema = object<CreateUserDTO>({
  hash: string().required(),
});
