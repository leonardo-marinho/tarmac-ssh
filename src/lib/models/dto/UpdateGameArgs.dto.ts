import { UpdateDTO } from '@/server/types';
import { Game } from '@prisma/client';

export interface UpdateGameArgs extends UpdateDTO<Game> {}
