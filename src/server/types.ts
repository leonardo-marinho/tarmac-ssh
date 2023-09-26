import { NextApiRequest, NextApiResponse } from 'next';

import { HttpMethodsEnum, HttpResponseCodesEnum } from './enums';

export interface ApiRoute {
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>;
  method: HttpMethodsEnum;
  path: string;
}

export interface InfinitePaginationResponseType<TData> {
  hasMore: boolean;
  page: number;
  records: TData[];
}

export interface ControllerErrorResponseType {
  code: string;
  httpResponseCode?: number;
  message?: string;
  name: string;
}

export type HttpStatusCodesNamesType = typeof HttpResponseCodesEnum;

export type ApiErrorNamesType =
  | 'NOT_TREATED'
  | 'VALIDATION_ERROR'
  | keyof Omit<HttpStatusCodesNamesType, 'CREATED' | 'OK'>;

export type ModelWithoutLogs<TModel> = Omit<TModel, 'created_at' | 'updated_at'>;

export type CreateDTO<TModel> = Omit<ModelWithoutLogs<TModel>, 'id'>;

export type UpdateDTO<TModel> = Omit<ModelWithoutLogs<TModel>, 'id'>;

export interface InfinitePaginationDTO {
  itemsPerPage?: string;
  page?: string;
}

export interface InfinitePaginationType {
  itemsPerPage: number;
  page: number;
}

export type GetManyDTO<TModel> = ModelWithoutLogs<TModel> & InfinitePaginationDTO;

export type IdType = number;

export type HashType = string;

export type KeyValuePair<TKey, TValue> = { key: TKey; value: TValue };
