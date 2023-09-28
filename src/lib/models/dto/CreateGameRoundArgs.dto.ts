import { CreateDTO } from '@/server/types';
import { GameRound } from '@prisma/client';

export interface CreateGameRoundArgs extends CreateDTO<GameRound> {}
