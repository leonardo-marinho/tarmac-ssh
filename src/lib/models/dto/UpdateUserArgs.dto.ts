import { UpdateDTO } from '@/server/types';
import { User } from '@prisma/client';

export interface UpdateUserArgs extends UpdateDTO<User> {}
