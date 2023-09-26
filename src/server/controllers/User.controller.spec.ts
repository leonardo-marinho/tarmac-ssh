import { mockNextApiRequest } from '@/lib/mocks/NextApiRequest.mock';
import { mockNextApiResponse } from '@/lib/mocks/NextApiResponse.mock';
import { prismaMock } from '@/lib/mocks/Prisma.mock';
import { mockUser } from '@/lib/mocks/User.mock';
import { CreateUserArgs } from '@/lib/models/dto/CreateUserArgs.dto';
import { HttpResponseCodesEnum } from '@/server/enums';
import { InternalServerErrorException } from '@/server/exceptions/InternalServerError.exception';
import { NotFoundException } from '@/server/exceptions/NotFound.exception';
import { ValidationException } from '@/server/exceptions/Validation.exception';
import { resolveInfinitePaginationResponse } from '@/server/utils/resolveInfinitePaginationResponse';
import { NextApiRequest, NextApiResponse } from 'next';

import UserController from './User.controller';

jest.mock('@/server/utils/handleApiError', () => ({
  __esModule: true,
  handleApiError: jest.fn(),
}));

describe('User controller', () => {
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
        hash: 'hash',
        username: 'username',
      } as CreateUserArgs;
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
      mockedNextApiRequest.body = {} as CreateUserArgs;
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
  });

  describe('updateUser', () => {
    beforeEach(() => {
      mockedNextApiRequest.body = {
        hash: '0xabc123',
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
  });
});
