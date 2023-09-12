import { ApiErrorNamesType, ControllerErrorResponseType } from './types';
import { HttpResponseCodesEnum, HttpResponseCodesNamesEnum } from './enums';

export const ApiErrors: Record<
  ApiErrorNamesType,
  Omit<ControllerErrorResponseType, 'error'>
> = {
  [HttpResponseCodesNamesEnum.METHOD_NOT_ALLOWED]: {
    name: 'Method not allowed',
    code: HttpResponseCodesNamesEnum.METHOD_NOT_ALLOWED,
    httpResponseCode: HttpResponseCodesEnum.METHOD_NOT_ALLOWED,
  },
  BAD_REQUEST: {
    name: 'Bad request',
    code: HttpResponseCodesNamesEnum.BAD_REQUEST,
    httpResponseCode: HttpResponseCodesEnum.BAD_REQUEST,
  },
  UNAUTHORIZED: {
    name: 'Unauthorized',
    code: HttpResponseCodesNamesEnum.UNAUTHORIZED,
    httpResponseCode: HttpResponseCodesEnum.UNAUTHORIZED,
  },
  FORBIDDEN: {
    name: 'Forbidden',
    code: HttpResponseCodesNamesEnum.FORBIDDEN,
    httpResponseCode: HttpResponseCodesEnum.FORBIDDEN,
  },
  NOT_FOUND: {
    name: 'Not found',
    code: HttpResponseCodesNamesEnum.NOT_FOUND,
    httpResponseCode: HttpResponseCodesEnum.NOT_FOUND,
  },
  INTERNAL_SERVER_ERROR: {
    name: 'Internal server error',
    code: HttpResponseCodesNamesEnum.INTERNAL_SERVER_ERROR,
    httpResponseCode: HttpResponseCodesEnum.INTERNAL_SERVER_ERROR,
  },
  VALIDATION_ERROR: {
    name: 'Validation error',
    code: 'VALIDATION_ERROR',
    httpResponseCode: HttpResponseCodesEnum.BAD_REQUEST,
  },
};

export const DEFAULT_ITEMS_PER_PAGE = 20;
