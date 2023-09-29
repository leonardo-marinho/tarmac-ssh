import prisma from '@/lib/database/client';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { HashType } from '../types';

class AuthService {
  async isRegistered(hash: HashType): Promise<boolean> {
    const user = await prisma.user.findFirst({
      where: {
        hash,
      },
    });

    return !!user;
  }

  async signIn(user: User): Promise<null | string> {
    return jwt.sign(
      { address: user.hash, username: user.username },
      process.env.JWT_SECRET as string,
      {
        expiresIn: 300,
      },
    );
  }

  async signUp(hash: HashType, username: string): Promise<null | User> {
    const user: null | User = await prisma.user.create({
      data: {
        hash,
        username,
      },
    });

    return user;
  }
}

export default new AuthService();
