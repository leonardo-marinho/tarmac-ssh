import { UpdateDTO } from '@/server/types';
import { GameBet } from '@prisma/client';

export interface UpdateGameBetArgs extends UpdateDTO<GameBet> {}
