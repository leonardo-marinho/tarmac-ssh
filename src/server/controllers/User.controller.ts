import { Prisma, User } from '@prisma/client';
import { InfinitePaginationType } from '../types';
import { NextApiRequest, NextApiResponse } from 'next';
import { CreateUserDTO } from '@/lib/models/dto/CreateUser.dto';
import prisma from '@/lib/database/client';
import { HttpResponseCodesEnum } from '../enums';
import { resolveInfinitePaginationResponse } from '../utils/resolveInfinitePaginationResponse';
import { createUserDtoSchema } from '@/lib/validations/CreateUserDto.schema';
import { GetManyUserDTO } from '@/lib/models/dto/GetManyUser.dto';
import { getManyUserDtoSchema } from '@/lib/validations/GetManyUserDto.schema';
import { resolveBulkArgs } from '@/server/utils/resolveBulkArgs';
import { resolveInfinitePagination } from '../utils/resolveInfinitePagination';
import { resolvePrismaPaginationArgs } from '@/server/utils/resolvePrismaPaginationArgs';
import { IdDTO } from '@/lib/models/dto/Id.dto';
import { idDtoSchema } from '@/lib/validations/IdDto.schema';
import { HashDTO } from '@/lib/models/dto/Hash.dto';
import { hashDtoSchema } from '@/lib/validations/HashDto.schema';
import { validateSchema } from '../utils/validateSchema';
import { NotFoundException } from '../exceptions/NotFound.exception';
import { InternalServerErrorException } from '../exceptions/InternalServerError.exception';

class UserController {
  async create(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body: CreateUserDTO = req.body;
    validateSchema<CreateUserDTO>(createUserDtoSchema, body);

    const response = await prisma.user.create({
      data: {
        username: body.username,
        accountHash: body.accountHash,
      },
    });

    if (!response) {
      throw new InternalServerErrorException('User could not be created');
    }

    res
      .status(HttpResponseCodesEnum.CREATED)
      .json(resolveInfinitePaginationResponse(response));
  }

  async deleteById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdDTO = req.query;
    validateSchema<IdDTO>(idDtoSchema, query);

    const response: User | null = await prisma.user.delete({
      where: {
        id: Number(query.id),
      },
    });

    if (!response) {
      throw new NotFoundException(`User, with id ${query.id}, not found`);
    }

    res
      .status(HttpResponseCodesEnum.OK)
      .json(resolveInfinitePaginationResponse(response));
  }

  async getMany(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: GetManyUserDTO = req.query as unknown as GetManyUserDTO;
    const pagination: InfinitePaginationType = resolveInfinitePagination(
      req.query,
    );
    validateSchema<GetManyUserDTO>(getManyUserDtoSchema, query);

    const response = await prisma.user.findMany({
      where: resolveBulkArgs<Prisma.UserWhereInput>([
        {
          key: 'id',
          value: query?.ids,
        },
        {
          key: 'username',
          value: query?.usernames,
        },
        {
          key: 'accountHash',
          value: query?.accountHashes,
        },
      ]),
      ...resolvePrismaPaginationArgs(pagination),
    });

    res
      .status(HttpResponseCodesEnum.OK)
      .json(resolveInfinitePaginationResponse(response, pagination));
  }

  async getByHash(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: HashDTO = req.query;
    validateSchema<HashDTO>(hashDtoSchema, query);

    const response: User | null = await prisma.user.findUnique({
      where: {
        accountHash: query.hash,
      },
    });

    if (!response) {
      throw new NotFoundException(`User, with hash ${query.hash}, not found`);
    }

    res
      .status(HttpResponseCodesEnum.OK)
      .json(resolveInfinitePaginationResponse(response));
  }

  async getById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdDTO = req.query;
    validateSchema<IdDTO>(idDtoSchema, query);

    const response: User | null = await prisma.user.findUnique({
      where: {
        id: Number(query.id),
      },
    });

    if (!response) {
      throw new NotFoundException(`User, with id ${query.id}, not found`);
    }

    res
      .status(HttpResponseCodesEnum.OK)
      .json(resolveInfinitePaginationResponse(response));
  }
}

export default new UserController();
