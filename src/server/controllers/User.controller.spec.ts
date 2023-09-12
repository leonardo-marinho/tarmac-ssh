import { mockNextApiRequest } from '@/lib/mocks/NextApiRequest.mock';
import UserController from './User.controller';
import { NextApiRequest, NextApiResponse } from 'next';
import { mockNextApiResponse } from '@/lib/mocks/NextApiResponse.mock';
import { CreateUserDTO } from '@/lib/models/dto/CreateUser.dto';
import { ValidationException } from '../exceptions/Validation.exception';
import { HttpResponseCodesEnum } from '../enums';
import { prismaMock } from '@/lib/mocks/Prisma.mock';
import { mockUser } from '@/lib/mocks/User.mock';
import { resolveInfinitePaginationResponse } from '../utils/resolveInfinitePaginationResponse';
import { InternalServerErrorException } from '../exceptions/InternalServerError.exception';
import { NotFoundException } from '../exceptions/NotFound.exception';

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
    mockedNextApiResponse = mockNextApiResponse(
      {},
      { status: mockedResponseStatusFn },
    );
  });

  describe('create', () => {
    it('should send status 201 and user as response', async () => {
      const mockedUser = mockUser();
      prismaMock.user.create.mockImplementation(
        jest.fn().mockReturnValue(mockedUser),
      );
      mockedNextApiRequest.body = {
        username: 'username',
        accountHash: 'accountHash',
      } as CreateUserDTO;
      await UserController.create(mockedNextApiRequest, mockedNextApiResponse);
      expect(mockedNextApiResponse.status).toHaveBeenCalledWith(
        HttpResponseCodesEnum.CREATED,
      );
      expect(mockedResponseStatusFn).toHaveBeenCalledWith(
        resolveInfinitePaginationResponse(mockedUser),
      );
    });

    it('should throw error for invalid body', async () => {
      try {
        mockedNextApiRequest.body = {} as CreateUserDTO;
        await UserController.create(
          mockedNextApiRequest,
          mockedNextApiResponse,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationException);
      }
    });

    it('should throw error if fails to create user', async () => {
      try {
        mockedNextApiRequest.body = {
          username: 'username',
          accountHash: 'accountHash',
        } as CreateUserDTO;
        await UserController.create(
          mockedNextApiRequest,
          mockedNextApiResponse,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('deleteById', () => {
    it('should send status 200 and user as response', async () => {
      const mockedUser = mockUser();
      prismaMock.user.delete.mockImplementation(
        jest.fn().mockReturnValue(mockedUser),
      );
      mockedNextApiRequest.query = {
        id: '1',
      };
      await UserController.deleteById(
        mockedNextApiRequest,
        mockedNextApiResponse,
      );
      expect(mockedNextApiResponse.status).toHaveBeenCalledWith(
        HttpResponseCodesEnum.OK,
      );
      expect(mockedResponseStatusFn).toHaveBeenCalledWith(
        resolveInfinitePaginationResponse(mockedUser),
      );
    });

    it('should throw error for invalid query', async () => {
      try {
        mockedNextApiRequest.query = {};
        await UserController.deleteById(
          mockedNextApiRequest,
          mockedNextApiResponse,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationException);
      }
    });

    it('should throw error if fails to delete user', async () => {
      try {
        mockedNextApiRequest.query = {
          id: '1',
        };
        await UserController.deleteById(
          mockedNextApiRequest,
          mockedNextApiResponse,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('getMany', () => {
    it('should send status 200 and users as response', async () => {
      const mockedUser = mockUser();
      prismaMock.user.findMany.mockImplementation(
        jest.fn().mockReturnValue([mockedUser]),
      );
      mockedNextApiRequest.query = {
        ids: '1',
      };
      await UserController.getMany(mockedNextApiRequest, mockedNextApiResponse);
      expect(mockedNextApiResponse.status).toHaveBeenCalledWith(
        HttpResponseCodesEnum.OK,
      );
      expect(mockedResponseStatusFn).toHaveBeenCalledWith(
        resolveInfinitePaginationResponse([mockedUser]),
      );
    });

    it('should throw error for invalid query', async () => {
      try {
        mockedNextApiRequest.query = {};
        await UserController.getMany(
          mockedNextApiRequest,
          mockedNextApiResponse,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationException);
      }
    });
  });

  describe('getByHash', () => {
    it('should send status 200 and user as response', async () => {
      const mockedUser = mockUser();
      prismaMock.user.findUnique.mockImplementation(
        jest.fn().mockReturnValue(mockedUser),
      );
      mockedNextApiRequest.query = {
        hash: 'hash',
      };
      await UserController.getByHash(
        mockedNextApiRequest,
        mockedNextApiResponse,
      );
      expect(mockedNextApiResponse.status).toHaveBeenCalledWith(
        HttpResponseCodesEnum.OK,
      );
      expect(mockedResponseStatusFn).toHaveBeenCalledWith(
        resolveInfinitePaginationResponse(mockedUser),
      );
    });

    it('should throw error for invalid query', async () => {
      try {
        mockedNextApiRequest.query = {};
        await UserController.getByHash(
          mockedNextApiRequest,
          mockedNextApiResponse,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationException);
      }
    });

    it('should throw error if fails to find user', async () => {
      try {
        mockedNextApiRequest.query = {
          hash: 'hash',
        };
        await UserController.getByHash(
          mockedNextApiRequest,
          mockedNextApiResponse,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('getById', () => {
    it('should send status 200 and user as response', async () => {
      const mockedUser = mockUser();
      prismaMock.user.findUnique.mockImplementation(
        jest.fn().mockReturnValue(mockedUser),
      );
      mockedNextApiRequest.query = {
        id: '1',
      };
      await UserController.getById(mockedNextApiRequest, mockedNextApiResponse);
      expect(mockedNextApiResponse.status).toHaveBeenCalledWith(
        HttpResponseCodesEnum.OK,
      );
      expect(mockedResponseStatusFn).toHaveBeenCalledWith(
        resolveInfinitePaginationResponse(mockedUser),
      );
    });

    it('should throw error for invalid query', async () => {
      try {
        mockedNextApiRequest.query = {};
        await UserController.getById(
          mockedNextApiRequest,
          mockedNextApiResponse,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationException);
      }
    });

    it('should throw error if fails to find user', async () => {
      try {
        mockedNextApiRequest.query = {
          id: '1',
        };
        await UserController.getById(
          mockedNextApiRequest,
          mockedNextApiResponse,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
