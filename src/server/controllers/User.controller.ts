import { CreateUserArgs } from '@/lib/models/dto/CreateUserArgs.dto';
import { GetManyUserArgs } from '@/lib/models/dto/GetManyUserArgs.dto';
import { HashArgs } from '@/lib/models/dto/HashArgs.dto';
import { IdArgs } from '@/lib/models/dto/IdArgs.dto';
import { UpdateUserArgs } from '@/lib/models/dto/UpdateUserArgs.dto';
import { createUserArgsSchema } from '@/lib/validations/CreateUserArgs.schema';
import { getManyUserArgsSchema } from '@/lib/validations/GetManyUserArgs.schema';
import { hashArgsSchema } from '@/lib/validations/HashArgs.schema';
import { idArgsSchema } from '@/lib/validations/IdArgs.schema';
import { updateUserArgsSchema } from '@/lib/validations/UpdateUserArgs.schema';
import { HttpResponseCodesEnum } from '@/server/enums';
import { InternalServerErrorException } from '@/server/exceptions/InternalServerError.exception';
import { NotFoundException } from '@/server/exceptions/NotFound.exception';
import UserService from '@/server/services/User.service';
import { InfinitePaginationType } from '@/server/types';
import { resolveInfinitePagination } from '@/server/utils/resolveInfinitePagination';
import { resolveInfinitePaginationResponse } from '@/server/utils/resolveInfinitePaginationResponse';
import { resolvePrismaBooleanArg } from '@/server/utils/resolvePrismaBooleanArg';
import { validateSchema } from '@/server/utils/validateSchema';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

class UserController {
  async create(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body: CreateUserArgs = req.body;
    validateSchema<CreateUserArgs>(createUserArgsSchema, body);
    const response: User = await UserService.create(body);

    if (!response) {
      throw new InternalServerErrorException(`User, with hash ${body.hash}, could not be created`);
    }

    res.status(HttpResponseCodesEnum.CREATED).json(resolveInfinitePaginationResponse(response));
  }

  async deleteById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdArgs = req.query;
    validateSchema<IdArgs>(idArgsSchema, query);
    const response: User = await UserService.deleteById(Number(query.id!));

    if (!response) {
      throw new NotFoundException(`User, with id ${query.id}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(resolveInfinitePaginationResponse(response));
  }

  async getByHash(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: HashArgs = req.query;
    validateSchema<HashArgs>(hashArgsSchema, query);
    const response: null | User = await UserService.getByHash(query.hash!);

    if (!response) {
      throw new NotFoundException(`User, with hash ${query.hash}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(resolveInfinitePaginationResponse(response));
  }

  async getById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdArgs = req.query;
    validateSchema<IdArgs>(idArgsSchema, query);
    const response: null | User = await UserService.getById(Number(query.id!));

    if (!response) {
      throw new NotFoundException(`User, with id ${query.id!}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(resolveInfinitePaginationResponse(response));
  }

  async getMany(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: GetManyUserArgs = req.query;
    validateSchema<GetManyUserArgs>(getManyUserArgsSchema, query);
    const pagination: InfinitePaginationType = resolveInfinitePagination(req.query);
    const response: User[] = await UserService.bulkSearch(
      { ...query, disabled: resolvePrismaBooleanArg(query.disabled) },
      pagination,
    );
    res
      .status(HttpResponseCodesEnum.OK)
      .json(resolveInfinitePaginationResponse(response, pagination));
  }

  async updateUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body: UpdateUserArgs = req.body;
    validateSchema<UpdateUserArgs>(updateUserArgsSchema, body);
    const query: IdArgs = req.query;
    validateSchema<IdArgs>(idArgsSchema, query);
    const response: User = await UserService.updateUser(Number(query.id!), body);
    res.status(HttpResponseCodesEnum.OK).json(response);
  }
}

export default new UserController();
