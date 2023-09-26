import prisma from '@/lib/database/client';
import { HashType, IdType, InfinitePaginationType } from '@/server/types';
import { resolveBulkArgs } from '@/server/utils/resolveBulkArgs';
import { resolvePrismaPaginationArgs } from '@/server/utils/resolvePrismaPaginationArgs';
import { Prisma, User } from '@prisma/client';

interface UserBulkSearchArgs extends Prisma.UserWhereInput {
  hashes?: string;
  ids?: string;
  usernames?: string;
}

class UserService {
  async bulkSearch(
    { hashes, ids, usernames, ...nonBulkSearchArgs }: UserBulkSearchArgs,
    pagination: InfinitePaginationType,
  ): Promise<User[]> {
    const whereArgs = resolveBulkArgs<Prisma.UserWhereInput>(
      [
        {
          key: 'id',
          value: ids,
        },
        {
          key: 'username',
          value: usernames,
        },
        {
          key: 'hash',
          value: hashes,
        },
      ],
      nonBulkSearchArgs,
    );

    const users = await prisma.user.findMany({
      where: whereArgs,
      ...resolvePrismaPaginationArgs(pagination),
    });

    return users;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const response: null | User = await prisma.user.create({
      data,
    });

    return response;
  }

  async deleteById(id: IdType): Promise<User> {
    let response: null | User = null;

    response = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return response;
  }

  async exists(hash: HashType): Promise<boolean> {
    return !!(await prisma.user.findUnique({
      where: {
        hash,
      },
    }));
  }

  async getByHash(hash: HashType): Promise<null | User> {
    let response: null | User = null;

    response = await prisma.user.findUnique({
      where: {
        hash,
      },
    });

    return response;
  }

  async getById(id: number): Promise<null | User> {
    const response: null | User = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return response;
  }

  async updateUser(id: IdType, data: Prisma.UserUpdateInput): Promise<User> {
    const response: User = await prisma.user.update({
      data,
      where: {
        id: id,
      },
    });

    return response;
  }
}

export default new UserService();
