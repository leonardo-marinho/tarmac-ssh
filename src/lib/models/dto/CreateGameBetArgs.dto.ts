import { CreateDTO } from '@/server/types';
import { GameBet } from '@prisma/client';

export interface CreateGameBetArgs extends CreateDTO<GameBet> {}
