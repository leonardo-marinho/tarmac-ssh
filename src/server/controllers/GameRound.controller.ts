import prisma from '@/lib/database/client';
import { CreateGameRoundArgs } from '@/lib/models/dto/CreateGameRoundArgs.dto';
import { GetManyGameRoundArgs } from '@/lib/models/dto/GetManyGameRoundArgs.dto';
import { IdArgs } from '@/lib/models/dto/IdArgs.dto';
import { UpdateGameRoundArgs } from '@/lib/models/dto/UpdateGameRoundArgs.dto';
import { createGameRoundArgsSchema } from '@/lib/validations/CreateGameRoundArgs.schema';
import { getManyGameRoundArgsSchema } from '@/lib/validations/GetManyGameRoundArgs.schema';
import { idArgsSchema } from '@/lib/validations/IdArgs.schema';
import { updateGameRoundArgsSchema } from '@/lib/validations/UpdateGameRoundArgs.schema';
import { HttpResponseCodesEnum, RoundStatus } from '@/server/enums';
import { InternalServerErrorException } from '@/server/exceptions/InternalServerError.exception';
import { NotFoundException } from '@/server/exceptions/NotFound.exception';
import GameRoundService from '@/server/services/GameRound.service';
import { InfinitePaginationType } from '@/server/types';
import { resolveInfinitePagination } from '@/server/utils/resolveInfinitePagination';
import { resolveInfinitePaginationResponse } from '@/server/utils/resolveInfinitePaginationResponse';
import { validateSchema } from '@/server/utils/validateSchema';
import { GameRound } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const TIME_TO_COMPLETE = 5000;
const TIME_TO_START = 5000;

class GameRoundController {
  async create(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body: CreateGameRoundArgs = req.body;
    validateSchema<CreateGameRoundArgs>(createGameRoundArgsSchema, body);
    const response = await prisma.gameRound.create({
      data: {
        gameId: body.gameId,
        status: body.status,
      },
    });
    if (!response) {
      throw new InternalServerErrorException(
        `GameRound, with name ${body.gameId}, could not be created`,
      );
    }

    res.status(HttpResponseCodesEnum.CREATED).json(resolveInfinitePaginationResponse(response));
  }

  async deleteById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdArgs = req.query;
    validateSchema<IdArgs>(idArgsSchema, query);
    const response: GameRound = await GameRoundService.deleteById(Number(query.id!));

    if (!response) {
      throw new NotFoundException(`GameRound, with id ${query.id}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(resolveInfinitePaginationResponse(response));
  }

  async getById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdArgs = req.query;
    validateSchema<IdArgs>(idArgsSchema, query);
    const response: GameRound | null = await GameRoundService.getById(Number(query.id!));

    if (!response) {
      throw new NotFoundException(`GameRound, with id ${query.id!}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(resolveInfinitePaginationResponse(response));
  }

  async getMany(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: GetManyGameRoundArgs = req.query;
    validateSchema<GetManyGameRoundArgs>(getManyGameRoundArgsSchema, query);
    const pagination: InfinitePaginationType = resolveInfinitePagination(req.query);
    const response: GameRound[] = await GameRoundService.bulkSearch({ ...query }, pagination);
    res
      .status(HttpResponseCodesEnum.OK)
      .json(resolveInfinitePaginationResponse(response, pagination));
  }

  async start(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const status = RoundStatus.WAITING_BETS;
    const { id } = req.query;

    console.log(`IT's ON!! >> ${status} <<`);
    if (!id || !status) {
      return res.status(400).json({ error: 'gameId and status are required' });
    }

    const gameId = parseInt(id as string);

    if (isNaN(gameId)) {
      return res.status(400).json({ error: 'gameId not valid' });
    }

    const body: CreateGameRoundArgs = {
      createdAt: new Date(),
      gameId,
      status,
      updatedAt: new Date(),
    };

    validateSchema<CreateGameRoundArgs>(createGameRoundArgsSchema, body);

    const response = await prisma.gameRound.create({
      data: body,
    });

    if (!response) {
      throw new InternalServerErrorException(
        `GameRound, with gameId ${body.gameId}, could not be created`,
      );
    }

    this.startRound(response.id);

    res.status(HttpResponseCodesEnum.CREATED).json(resolveInfinitePaginationResponse(response));
  }

  async startRound(roundId: number) {
    let logInterval = setInterval(() => {
      console.log('Round status[WAITING_BETS]');
    }, 1000);
    setTimeout(async () => {
      clearInterval(logInterval);
      console.log(`Changing status round ${roundId} to RUNNING...`);
      logInterval = setInterval(() => {
        console.log('Round status[RUNNING]');
      }, 1000);
      await prisma.gameRound.update({
        data: { status: RoundStatus.RUNNING },
        where: { id: roundId },
      });

      setTimeout(async () => {
        clearInterval(logInterval);
        console.log('Round status [COMPLETED]');
        await prisma.gameRound.update({
          data: { status: RoundStatus.COMPLETED },
          where: { id: roundId },
        });
      }, TIME_TO_COMPLETE);
    }, TIME_TO_START);
  }

  async updateGameRound(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body: UpdateGameRoundArgs = req.body;
    validateSchema<UpdateGameRoundArgs>(updateGameRoundArgsSchema, body);
    const query: IdArgs = req.query;
    validateSchema<IdArgs>(idArgsSchema, query);
    const response: GameRound = await GameRoundService.updateGameRound(Number(query.id!), body);
    res.status(HttpResponseCodesEnum.OK).json(response);
  }
}

export default new GameRoundController();
