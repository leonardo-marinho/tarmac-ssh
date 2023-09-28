import { CreateDTO } from '@/server/types';
import { Game } from '@prisma/client';

export interface CreateGameArgs extends CreateDTO<Game> {}
