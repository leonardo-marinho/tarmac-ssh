import { CreateGameArgs } from '@/lib/models/dto/CreateGameArgs.dto';
import { GetManyGameArgs } from '@/lib/models/dto/GetManyGameArgs.dto';
import { IdArgs } from '@/lib/models/dto/IdArgs.dto';
import { UpdateGameArgs } from '@/lib/models/dto/UpdateGameArgs.dto';
import { createGameArgsSchema } from '@/lib/validations/CreateGameArgs.schema';
import { getManyGameArgsSchema } from '@/lib/validations/GetManyGameArgs.schema';
import { idArgsSchema } from '@/lib/validations/IdArgs.schema';
import { updateGameArgsSchema } from '@/lib/validations/UpdateGameArgs.schema';
import { HttpResponseCodesEnum } from '@/server/enums';
import { InternalServerErrorException } from '@/server/exceptions/InternalServerError.exception';
import { NotFoundException } from '@/server/exceptions/NotFound.exception';
import GameService from '@/server/services/Game.service';
import { InfinitePaginationType } from '@/server/types';
import { resolveInfinitePagination } from '@/server/utils/resolveInfinitePagination';
import { resolveInfinitePaginationResponse } from '@/server/utils/resolveInfinitePaginationResponse';
import { validateSchema } from '@/server/utils/validateSchema';
import { Game } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

class GameController {
  async create(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body: CreateGameArgs = req.body;
    validateSchema<CreateGameArgs>(createGameArgsSchema, body);
    const response: Game = await GameService.create(body);

    if (!response) {
      throw new InternalServerErrorException(`Game, with name ${body.name}, could not be created`);
    }

    res.status(HttpResponseCodesEnum.CREATED).json(resolveInfinitePaginationResponse(response));
  }

  async deleteById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdArgs = req.query;
    validateSchema<IdArgs>(idArgsSchema, query);
    const response: Game = await GameService.deleteById(Number(query.id!));

    if (!response) {
      throw new NotFoundException(`Game, with id ${query.id}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(resolveInfinitePaginationResponse(response));
  }

  async getById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdArgs = req.query;
    validateSchema<IdArgs>(idArgsSchema, query);
    const response: Game | null = await GameService.getById(Number(query.id!));

    if (!response) {
      throw new NotFoundException(`Game, with id ${query.id!}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(resolveInfinitePaginationResponse(response));
  }

  async getMany(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: GetManyGameArgs = req.query;
    validateSchema<GetManyGameArgs>(getManyGameArgsSchema, query);
    const pagination: InfinitePaginationType = resolveInfinitePagination(req.query);
    const response: Game[] = await GameService.bulkSearch({ ...query }, pagination);
    res
      .status(HttpResponseCodesEnum.OK)
      .json(resolveInfinitePaginationResponse(response, pagination));
  }

  async updateGame(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body: UpdateGameArgs = req.body;
    validateSchema<UpdateGameArgs>(updateGameArgsSchema, body);
    const query: IdArgs = req.query;
    validateSchema<IdArgs>(idArgsSchema, query);
    const response: Game = await GameService.updateGame(Number(query.id!), body);
    res.status(HttpResponseCodesEnum.OK).json(response);
  }
}

export default new GameController();
