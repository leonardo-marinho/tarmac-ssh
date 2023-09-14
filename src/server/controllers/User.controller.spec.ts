import { mockNextApiRequest } from '@/lib/mocks/NextApiRequest.mock';
import { mockNextApiResponse } from '@/lib/mocks/NextApiResponse.mock';
import { prismaMock } from '@/lib/mocks/Prisma.mock';
import { mockUser } from '@/lib/mocks/User.mock';
import { CreateUserDTO } from '@/lib/models/dto/CreateUser.dto';
import { NextApiRequest, NextApiResponse } from 'next';

import { HttpResponseCodesEnum } from '../enums';
import { InternalServerErrorException } from '../exceptions/InternalServerError.exception';
import { NotFoundException } from '../exceptions/NotFound.exception';
import { ValidationException } from '../exceptions/Validation.exception';
import { handlePrismaError } from '../utils/handlePrismaError';
import { resolveInfinitePaginationResponse } from '../utils/resolveInfinitePaginationResponse';
import UserController from './User.controller';

jest.mock('@/server/utils/handleApiError', () => ({
  __esModule: true,
  handleApiError: jest.fn(),
}));

jest.mock('../utils/handlePrismaError', () => ({
  __esModule: true,
  handlePrismaError: jest.fn(),
}));

describe('User controller', () => {
  const mockedHandlePrismaError = handlePrismaError as unknown as jest.Mock;
  const mockedResponseStatusFn = jest.fn();
  let mockedNextApiRequest: NextApiRequest;
  let mockedNextApiResponse: NextApiResponse;

  beforeEach(() => {
    mockedResponseStatusFn;
    mockedNextApiRequest = mockNextApiRequest();
    mockedNextApiResponse = mockNextApiResponse({}, { status: mockedResponseStatusFn });
  });

  describe('create', () => {
    beforeEach(() => {
      mockedNextApiRequest.body = {
        accountHash: 'accountHash',
        username: 'username',
      } as CreateUserDTO;
    });

    it('should send status 201 and user as response', async () => {
      const mockedUser = mockUser();
      prismaMock.user.create.mockImplementation(jest.fn().mockReturnValue(mockedUser));
      await UserController.create(mockedNextApiRequest, mockedNextApiResponse);
      expect(mockedNextApiResponse.status).toHaveBeenCalledWith(HttpResponseCodesEnum.CREATED);
      expect(mockedResponseStatusFn).toHaveBeenCalledWith(
        resolveInfinitePaginationResponse(mockedUser),
      );
    });

    it('should throw error for invalid body', async () => {
      mockedNextApiRequest.body = {} as CreateUserDTO;
      try {
        await UserController.create(mockedNextApiRequest, mockedNextApiResponse);
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationException);
      }
    });

    it('should throw error if fails to create user', async () => {
      try {
        await UserController.create(mockedNextApiRequest, mockedNextApiResponse);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });

    it('should send call handlePrismaError if prisma throws error', async () => {
      prismaMock.user.create.mockImplementation(() => {
        throw new Error();
      });

      try {
        await UserController.create(mockedNextApiRequest, mockedNextApiResponse);
      } catch (error) {
        expect(mockedHandlePrismaError).toHaveBeenCalled();
      }
    });
  });

  describe('deleteById', () => {
    beforeEach(() => {
      mockedNextApiRequest.query = {
        id: '1',
      };
    });

    it('should send status 200 and user as response', async () => {
      const mockedUser = mockUser();
      prismaMock.user.delete.mockImplementation(jest.fn().mockReturnValue(mockedUser));
      await UserController.deleteById(mockedNextApiRequest, mockedNextApiResponse);
      expect(mockedNextApiResponse.status).toHaveBeenCalledWith(HttpResponseCodesEnum.OK);
      expect(mockedResponseStatusFn).toHaveBeenCalledWith(
        resolveInfinitePaginationResponse(mockedUser),
      );
    });

    it('should throw error for invalid query', async () => {
      mockedNextApiRequest.query = {};
      try {
        await UserController.deleteById(mockedNextApiRequest, mockedNextApiResponse);
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationException);
      }
    });

    it('should throw error if fails to delete user', async () => {
      try {
        await UserController.deleteById(mockedNextApiRequest, mockedNextApiResponse);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should send call handlePrismaError if prisma throws error', async () => {
      prismaMock.user.delete.mockImplementation(() => {
        throw new Error();
      });

      try {
        await UserController.deleteById(mockedNextApiRequest, mockedNextApiResponse);
      } catch (error) {
        expect(mockedHandlePrismaError).toHaveBeenCalled();
      }
    });
  });

  describe('getMany', () => {
    beforeEach(() => {
      mockedNextApiRequest.query = {
        ids: '1',
      };
    });

    it('should send status 200 and users as response', async () => {
      const mockedUser = mockUser();
      prismaMock.user.findMany.mockImplementation(jest.fn().mockReturnValue([mockedUser]));
      await UserController.getMany(mockedNextApiRequest, mockedNextApiResponse);
      expect(mockedNextApiResponse.status).toHaveBeenCalledWith(HttpResponseCodesEnum.OK);
      expect(mockedResponseStatusFn).toHaveBeenCalledWith(
        resolveInfinitePaginationResponse([mockedUser]),
      );
    });

    it('should throw error for invalid query', async () => {
      mockedNextApiRequest.query = {};
      try {
        await UserController.getMany(mockedNextApiRequest, mockedNextApiResponse);
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationException);
      }
    });

    it('should send call handlePrismaError if prisma throws error', async () => {
      prismaMock.user.findMany.mockImplementation(() => {
        throw new Error();
      });

      try {
        await UserController.getMany(mockedNextApiRequest, mockedNextApiResponse);
      } catch (error) {
        expect(mockedHandlePrismaError).toHaveBeenCalled();
      }
    });
  });

  describe('getByHash', () => {
    beforeEach(() => {
      mockedNextApiRequest.query = {
        hash: 'hash',
      };
    });

    it('should send status 200 and user as response', async () => {
      const mockedUser = mockUser();
      prismaMock.user.findUnique.mockImplementation(jest.fn().mockReturnValue(mockedUser));
      await UserController.getByHash(mockedNextApiRequest, mockedNextApiResponse);
      expect(mockedNextApiResponse.status).toHaveBeenCalledWith(HttpResponseCodesEnum.OK);
      expect(mockedResponseStatusFn).toHaveBeenCalledWith(
        resolveInfinitePaginationResponse(mockedUser),
      );
    });

    it('should throw error for invalid query', async () => {
      try {
        mockedNextApiRequest.query = {};
        await UserController.getByHash(mockedNextApiRequest, mockedNextApiResponse);
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationException);
      }
    });

    it('should throw error if fails to find user', async () => {
      try {
        await UserController.getByHash(mockedNextApiRequest, mockedNextApiResponse);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should send call handlePrismaError if prisma throws error', async () => {
      prismaMock.user.findUnique.mockImplementation(() => {
        throw new Error();
      });

      try {
        await UserController.getByHash(mockedNextApiRequest, mockedNextApiResponse);
      } catch (error) {
        expect(mockedHandlePrismaError).toHaveBeenCalled();
      }
    });
  });

  describe('getById', () => {
    beforeEach(() => {
      mockedNextApiRequest.query = {
        id: '1',
      };
    });

    it('should send status 200 and user as response', async () => {
      const mockedUser = mockUser();
      prismaMock.user.findUnique.mockImplementation(jest.fn().mockReturnValue(mockedUser));
      await UserController.getById(mockedNextApiRequest, mockedNextApiResponse);
      expect(mockedNextApiResponse.status).toHaveBeenCalledWith(HttpResponseCodesEnum.OK);
      expect(mockedResponseStatusFn).toHaveBeenCalledWith(
        resolveInfinitePaginationResponse(mockedUser),
      );
    });

    it('should throw error for invalid query', async () => {
      mockedNextApiRequest.query = {};
      try {
        await UserController.getById(mockedNextApiRequest, mockedNextApiResponse);
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationException);
      }
    });

    it('should throw error if fails to find user', async () => {
      try {
        await UserController.getById(mockedNextApiRequest, mockedNextApiResponse);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should send call handlePrismaError if prisma throws error', async () => {
      prismaMock.user.findUnique.mockImplementation(() => {
        throw new Error();
      });

      try {
        await UserController.getById(mockedNextApiRequest, mockedNextApiResponse);
      } catch (error) {
        expect(mockedHandlePrismaError).toHaveBeenCalled();
      }
    });
  });

  describe('updateUser', () => {
    beforeEach(() => {
      mockedNextApiRequest.body = {
        accountHash: '0xabc123',
      };
      mockedNextApiRequest.query = {
        id: '1',
      };
    });

    it('should send status 200 and user as response', async () => {
      const mockedUser = mockUser();
      prismaMock.user.update.mockImplementation(jest.fn().mockReturnValue(mockedUser));
      await UserController.updateUser(mockedNextApiRequest, mockedNextApiResponse);
      expect(mockedNextApiResponse.status).toHaveBeenCalledWith(HttpResponseCodesEnum.OK);
      expect(mockedResponseStatusFn).toHaveBeenCalledWith(mockedUser);
    });

    it('should send call handlePrismaError if prisma throws error', async () => {
      prismaMock.user.update.mockImplementation(() => {
        throw new Error();
      });

      try {
        await UserController.updateUser(mockedNextApiRequest, mockedNextApiResponse);
      } catch (error) {
        expect(mockedHandlePrismaError).toHaveBeenCalled();
      }
    });
  });
});
