import { CreateDTO } from '@/server/types';
import { User } from '@prisma/client';

export interface CreateUserArgs extends CreateDTO<User> {}
