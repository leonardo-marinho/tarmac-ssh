import { CreateGameArgs } from '@/lib/models/dto/CreateGameArgs.dto';
import { object, string } from 'yup';

export const createGameArgsSchema = object<CreateGameArgs>({
  name: string().required(),
});
