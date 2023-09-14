import { UpdateDTO } from '@/server/types';
import { User } from '@prisma/client';

export interface UpdateUserDTO extends UpdateDTO<User> {}
