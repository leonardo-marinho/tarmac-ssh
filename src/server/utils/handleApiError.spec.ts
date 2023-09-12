import { NextApiRequest, NextApiResponse } from 'next';
import { handleApiError } from './handleApiError';
import { mockNextApiRequest } from '@/lib/mocks/NextApiRequest.mock';
import { UnsupportedMethodException } from '../exceptions/UnsupportedMethod.exception';
import { HttpMethodsEnum, HttpResponseCodesEnum } from '../enums';
import { mockNextApiResponse } from '@/lib/mocks/NextApiResponse.mock';
import { ValidationException } from '../exceptions/Validation.exception';
import { NotFoundException } from '../exceptions/NotFound.exception';

describe('handleApiError', () => {
  let mockedNextApiRequest: NextApiRequest = mockNextApiRequest();
  let mockedNextApiResponse: NextApiResponse = mockNextApiResponse();

  beforeEach(() => {
    mockedNextApiRequest = mockNextApiRequest();
    mockedNextApiResponse = mockNextApiResponse();
  });

  it('should return a 400 error if the error is an UnsupportedMethodException', () => {
    handleApiError(
      mockedNextApiRequest,
      mockedNextApiResponse,
      new UnsupportedMethodException(HttpMethodsEnum.GET, '/'),
    );
    expect(mockedNextApiResponse.status).toHaveBeenCalledWith(
      HttpResponseCodesEnum.METHOD_NOT_ALLOWED,
    );
  });

  it('should return a 405 error if the error is a ValidationException', () => {
    handleApiError(
      mockedNextApiRequest,
      mockedNextApiResponse,
      new ValidationException(''),
    );
    expect(mockedNextApiResponse.status).toHaveBeenCalledWith(
      HttpResponseCodesEnum.BAD_REQUEST,
    );
  });

  it('should return a 404 error if the error is a NotFoundException', () => {
    handleApiError(
      mockedNextApiRequest,
      mockedNextApiResponse,
      new NotFoundException(''),
    );
    expect(mockedNextApiResponse.status).toHaveBeenCalledWith(
      HttpResponseCodesEnum.NOT_FOUND,
    );
  });

  it('should return a 500 error if the error is not a known error', () => {
    handleApiError(mockedNextApiRequest, mockedNextApiResponse, new Error(''));
    expect(mockedNextApiResponse.status).toHaveBeenCalledWith(
      HttpResponseCodesEnum.INTERNAL_SERVER_ERROR,
    );
  });
});
