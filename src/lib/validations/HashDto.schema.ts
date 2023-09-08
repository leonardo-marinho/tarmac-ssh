import { object, string } from 'yup';
import { CreateUserDTO } from '../models/dto/CreateUser.dto';

export const HashDtoSchema = object<CreateUserDTO>({
  id: string(),
});
