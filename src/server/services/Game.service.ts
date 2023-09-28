import prisma from '@/lib/database/client';
import { IdType, InfinitePaginationType } from '@/server/types';
import { resolveBulkArgs } from '@/server/utils/resolveBulkArgs';
import { resolvePrismaPaginationArgs } from '@/server/utils/resolvePrismaPaginationArgs';
import { Game, Prisma } from '@prisma/client';

interface GameBulkSearchArgs extends Prisma.GameWhereInput {
  ids?: string;
  names?: string;
}

class GameService {
  async bulkSearch(
    { ids, names, ...nonBulkSearchArgs }: GameBulkSearchArgs,
    pagination: InfinitePaginationType,
  ): Promise<Game[]> {
    const whereArgs = resolveBulkArgs<Prisma.GameWhereInput>(
      [
        {
          key: 'id',
          value: ids,
        },
        {
          key: 'name',
          value: names,
        },
      ],
      nonBulkSearchArgs,
    );

    const games = await prisma.game.findMany({
      where: whereArgs,
      ...resolvePrismaPaginationArgs(pagination),
    });

    return games;
  }

  async create(data: Prisma.GameCreateInput): Promise<Game> {
    const response: Game | null = await prisma.game.create({
      data,
    });

    return response;
  }

  async deleteById(id: IdType): Promise<Game> {
    let response: Game | null = null;

    response = await prisma.game.delete({
      where: {
        id: id,
      },
    });

    return response;
  }

  async getById(id: number): Promise<Game | null> {
    const response: Game | null = await prisma.game.findUnique({
      where: {
        id,
      },
    });

    return response;
  }

  async updateGame(id: IdType, data: Prisma.GameUpdateInput): Promise<Game> {
    const response: Game = await prisma.game.update({
      data,
      where: {
        id: id,
      },
    });

    return response;
  }
}

export default new GameService();
