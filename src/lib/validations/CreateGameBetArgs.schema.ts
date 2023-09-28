import { CreateGameBetArgs } from '@/lib/models/dto/CreateGameBetArgs.dto';
import { number, object, string } from 'yup';

export const createGameBetArgsSchema = object<CreateGameBetArgs>({
  contractHash: string().required(),
  gameRoundId: number().required(),
  userId: number().required(),
});
