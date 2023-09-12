import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethodsEnum, HttpResponseCodesEnum } from './enums';

export interface ApiRoute {
  path: string;
  method: HttpMethodsEnum;
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>;
}

export interface InfinitePaginationResponseType<TData> {
  hasMore: boolean;
  page: number;
  records: TData[];
}

export interface ControllerErrorResponseType {
  name: string;
  code: string;
  httpResponseCode?: number;
  message?: string;
}

export type HttpStatusCodesNamesType = typeof HttpResponseCodesEnum;

export type ApiErrorNamesType =
  | keyof Omit<HttpStatusCodesNamesType, 'OK' | 'CREATED'>
  | 'VALIDATION_ERROR';

export type ModelWithoutLogs<TModel> = Omit<
  TModel,
  'created_at' | 'updated_at'
>;

export type CreateDTO<TModel> = Omit<ModelWithoutLogs<TModel>, 'id'>;

export interface InfinitePaginationDTO {
  page?: string;
  itemsPerPage?: string;
}

export interface InfinitePaginationType {
  page: number;
  itemsPerPage: number;
}

export type GetManyDTO<TModel> = ModelWithoutLogs<TModel> &
  InfinitePaginationDTO;
