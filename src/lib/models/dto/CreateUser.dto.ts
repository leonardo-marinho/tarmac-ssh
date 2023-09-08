import { CreateDTO } from '@/server/types';
import { User } from '@prisma/client';

export interface CreateUserDTO extends CreateDTO<User> {}
