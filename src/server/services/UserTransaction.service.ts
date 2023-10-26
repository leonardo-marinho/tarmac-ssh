import prisma from '@/lib/database/client';
import { Prisma } from '@prisma/client';

class UserTransactionService {
  create(data: Prisma.UserTransactionUncheckedCreateInput) {
    return prisma.userTransaction.create({ data });
  }
}

export default new UserTransactionService();
