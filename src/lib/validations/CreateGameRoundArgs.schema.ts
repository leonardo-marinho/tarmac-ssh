import { CreateGameRoundArgs } from '@/lib/models/dto/CreateGameRoundArgs.dto';
import { number, object } from 'yup';

export const createGameRoundArgsSchema = object<CreateGameRoundArgs>({
  gameId: number().required(),
});
