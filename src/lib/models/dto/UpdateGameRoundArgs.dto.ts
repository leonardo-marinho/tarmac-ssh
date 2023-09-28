import { UpdateDTO } from '@/server/types';
import { GameRound } from '@prisma/client';

export interface UpdateGameRoundArgs extends UpdateDTO<GameRound> {}
