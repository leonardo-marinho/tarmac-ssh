import { object, string } from 'yup';
import { CreateUserDTO } from '../models/dto/CreateUser.dto';

export const IdDtoSchema = object<CreateUserDTO>({
  id: string(),
});
