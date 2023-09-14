import prisma from '@/lib/database/client';
import { CreateUserDTO } from '@/lib/models/dto/CreateUser.dto';
import { GetManyUserDTO } from '@/lib/models/dto/GetManyUser.dto';
import { HashDTO } from '@/lib/models/dto/Hash.dto';
import { IdDTO } from '@/lib/models/dto/Id.dto';
import { UpdateUserDTO } from '@/lib/models/dto/UpdateUser.dto';
import { createUserDtoSchema } from '@/lib/validations/CreateUserDto.schema';
import { getManyUserDtoSchema } from '@/lib/validations/GetManyUserDto.schema';
import { hashDtoSchema } from '@/lib/validations/HashDto.schema';
import { idDtoSchema } from '@/lib/validations/IdDto.schema';
import { updateUserDtoSchema } from '@/lib/validations/UpdateUserDto.schema';
import { resolveBulkArgs } from '@/server/utils/resolveBulkArgs';
import { resolvePrismaPaginationArgs } from '@/server/utils/resolvePrismaPaginationArgs';
import { Prisma, User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { HttpResponseCodesEnum } from '../enums';
import { InternalServerErrorException } from '../exceptions/InternalServerError.exception';
import { NotFoundException } from '../exceptions/NotFound.exception';
import { InfinitePaginationType } from '../types';
import { handlePrismaError } from '../utils/handlePrismaError';
import { resolveInfinitePagination } from '../utils/resolveInfinitePagination';
import { resolveInfinitePaginationResponse } from '../utils/resolveInfinitePaginationResponse';
import { resolvePrismaBooleanArg } from '../utils/resolvePrismaBooleanArg';
import { validateSchema } from '../utils/validateSchema';

class UserController {
  async create(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body: CreateUserDTO = req.body;
    validateSchema<CreateUserDTO>(createUserDtoSchema, body);

    let response: null | User = null;

    try {
      response = await prisma.user.create({
        data: {
          accountHash: body.accountHash,
          username: body.username,
        },
      });
    } catch (error) {
      handlePrismaError(error as Prisma.PrismaClientKnownRequestError);
    }

    if (!response) {
      throw new InternalServerErrorException(
        `User, with hash ${body.accountHash}, could not be created`,
      );
    }

    res.status(HttpResponseCodesEnum.CREATED).json(resolveInfinitePaginationResponse(response));
  }

  async deleteById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdDTO = req.query;
    validateSchema<IdDTO>(idDtoSchema, query);

    let response: null | User = null;

    try {
      response = await prisma.user.delete({
        where: {
          id: Number(query.id),
        },
      });
    } catch (error) {
      handlePrismaError(error as Prisma.PrismaClientKnownRequestError);
    }

    if (!response) {
      throw new NotFoundException(`User, with id ${query.id}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(resolveInfinitePaginationResponse(response));
  }

  async getByHash(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: HashDTO = req.query;
    validateSchema<HashDTO>(hashDtoSchema, query);

    let response: null | User = null;

    try {
      response = await prisma.user.findUnique({
        where: {
          accountHash: query.hash,
        },
      });
    } catch (error) {
      handlePrismaError(error as Prisma.PrismaClientKnownRequestError);
    }

    if (!response) {
      throw new NotFoundException(`User, with hash ${query.hash}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(resolveInfinitePaginationResponse(response));
  }

  async getById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdDTO = req.query;
    validateSchema<IdDTO>(idDtoSchema, query);

    let response: null | User = null;

    try {
      response = await prisma.user.findUnique({
        where: {
          id: Number(query.id),
        },
      });
    } catch (error) {
      handlePrismaError(error as Prisma.PrismaClientKnownRequestError);
    }

    if (!response) {
      throw new NotFoundException(`User, with id ${query.id}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(resolveInfinitePaginationResponse(response));
  }

  async getMany(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: GetManyUserDTO = req.query;
    validateSchema<GetManyUserDTO>(getManyUserDtoSchema, query);

    const pagination: InfinitePaginationType = resolveInfinitePagination(req.query);

    let response: User[] = [];

    try {
      response = await prisma.user.findMany({
        where: resolveBulkArgs<Prisma.UserWhereInput>(
          [
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
          ],
          {
            disabled: resolvePrismaBooleanArg(query?.disabled),
          },
        ),
        ...resolvePrismaPaginationArgs(pagination),
      });
    } catch (error) {
      handlePrismaError(error as Prisma.PrismaClientKnownRequestError);
    }

    res
      .status(HttpResponseCodesEnum.OK)
      .json(resolveInfinitePaginationResponse(response, pagination));
  }

  async updateUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body: UpdateUserDTO = req.body;
    validateSchema<UpdateUserDTO>(updateUserDtoSchema, body);

    const query: IdDTO = req.query;
    validateSchema<IdDTO>(idDtoSchema, query);

    let response: null | User = null;

    try {
      response = await prisma.user.update({
        data: {
          accountHash: body.accountHash,
          disabled: body.disabled,
          username: body.username,
        },
        where: {
          id: Number(query.id),
        },
      });
    } catch (error) {
      handlePrismaError(error as Prisma.PrismaClientKnownRequestError);
    }

    if (!response) {
      throw new NotFoundException(`User, with id ${query.id}, could not be updated`);
    }

    res.status(HttpResponseCodesEnum.OK).json(response);
  }
}

export default new UserController();
