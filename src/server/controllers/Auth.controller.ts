import { AuthSignInResponse } from '@/lib/models/dto/AuthSignInResponse.dto';
import { AuthSignUpArgs } from '@/lib/models/dto/AuthSignUpArgs.dto';
import { AuthSignUpResponse } from '@/lib/models/dto/AuthSignUpResponse.dto';
import { HashArgs } from '@/lib/models/dto/HashArgs.dto';
import { authSignUpArgsSchema } from '@/lib/validations/AuthSignUpArgs.schema';
import { hashArgsSchema } from '@/lib/validations/HashArgs.schema';
import { HttpResponseCodesEnum } from '@/server/enums';
import { InternalServerErrorException } from '@/server/exceptions/InternalServerError.exception';
import { UnauthorizedException } from '@/server/exceptions/Unauthorized.exception';
import AuthService from '@/server/services/Auth.service';
import { HashType } from '@/server/types';
import { validateSchema } from '@/server/utils/validateSchema';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { NotFoundException } from '../exceptions/NotFound.exception';
import UserService from '../services/User.service';

class AuthController {
  // async isRegistred(req: NextApiRequest, res: NextApiResponse) {
  //   const query: HashArgs = req.query;
  //   validateSchema<HashArgs>(hashArgsSchema, query);

  //   const response = await AuthService.isRegistred(query.hash);

  //   res.status(HttpResponseCodesEnum.OK).json(response);
  // }

  async signIn(req: NextApiRequest, res: NextApiResponse) {
    const body: HashArgs = JSON.parse(req.body);
    validateSchema<HashArgs>(hashArgsSchema, body);

    const isRegistered = await AuthService.isRegistered(body.hash!);
    if (!isRegistered) {
      throw new UnauthorizedException(`User with hash ${body.hash} is not registered`);
    }

    const user = await UserService.getByHash(body.hash!);

    if (!user) {
      throw new NotFoundException(`User with hash ${body.hash!} not found`);
    }

    const accessToken = await AuthService.signIn(user);
    if (accessToken === null) {
      throw new InternalServerErrorException(`Error while signing up user with hash ${body.hash}`);
    }

    res.status(HttpResponseCodesEnum.OK).json({ accessToken, user } as AuthSignInResponse);
  }

  async signUp(req: NextApiRequest, res: NextApiResponse) {
    const body: AuthSignUpArgs = JSON.parse(req.body);
    validateSchema<AuthSignUpArgs>(authSignUpArgsSchema, body);

    const isRegistered = await AuthService.isRegistered(body.hash! as HashType);
    let user: null | User = null;
    if (!isRegistered) {
      user = await AuthService.signUp(body.hash! as HashType, body.username);

      if (!user) {
        throw new InternalServerErrorException(
          `Error while signing up user with hash ${body.hash}`,
        );
      }
    }

    res.status(HttpResponseCodesEnum.CREATED).json({} as AuthSignUpResponse);
  }
}

export default new AuthController();
