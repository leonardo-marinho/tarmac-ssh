import { CreateDTO } from '@/server/types';
import { UserTransaction } from '@prisma/client';

export interface CreateUserTransactionArgsDto extends CreateDTO<UserTransaction> {}
