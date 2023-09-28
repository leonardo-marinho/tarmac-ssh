import { CreateGameRoundArgs } from '@/lib/models/dto/CreateGameRoundArgs.dto';
import { number, object, string } from 'yup';

export const createGameRoundArgsSchema = object<CreateGameRoundArgs>({
  gameId: number().required(),
  status: string().required(),
});
