import prisma from '@/lib/database/client';
import { IdType, InfinitePaginationType } from '@/server/types';
import { resolveBulkArgs } from '@/server/utils/resolveBulkArgs';
import { resolvePrismaPaginationArgs } from '@/server/utils/resolvePrismaPaginationArgs';
import { GameRound, Prisma } from '@prisma/client';

interface GameRoundBulkSearchArgs extends Prisma.GameRoundWhereInput {
  gameIds?: string;
  ids?: string;
}

class GameRoundService {
  async bulkSearch(
    { gameIds, ids, ...nonBulkSearchArgs }: GameRoundBulkSearchArgs,
    pagination: InfinitePaginationType,
  ): Promise<GameRound[]> {
    const whereArgs = resolveBulkArgs<Prisma.GameRoundWhereInput>(
      [
        {
          key: 'id',
          value: ids,
        },
        {
          key: 'gameId',
          value: gameIds,
        },
      ],
      nonBulkSearchArgs,
    );

    const gameRounds = await prisma.gameRound.findMany({
      where: whereArgs,
      ...resolvePrismaPaginationArgs(pagination),
    });

    return gameRounds;
  }

  async create(data: Prisma.GameRoundCreateInput): Promise<GameRound> {
    const response: GameRound | null = await prisma.gameRound.create({
      data,
    });

    return response;
  }

  async deleteById(id: IdType): Promise<GameRound> {
    let response: GameRound | null = null;

    response = await prisma.gameRound.delete({
      where: {
        id: id,
      },
    });

    return response;
  }

  async getById(id: number): Promise<GameRound | null> {
    const response: GameRound | null = await prisma.gameRound.findUnique({
      where: {
        id,
      },
    });

    return response;
  }

  async updateGameRound(id: IdType, data: Prisma.GameRoundUpdateInput): Promise<GameRound> {
    const response: GameRound = await prisma.gameRound.update({
      data,
      where: {
        id: id,
      },
    });

    return response;
  }
}

export default new GameRoundService();
