import { AnyObject } from 'yup';
import { HttpResponseCodesEnum } from './enums';

export interface InfinitePaginationResponseType<TData> {
  hasMore: boolean;
  page: number;
  records: TData[];
}

export interface ControllerErrorResponseType {
  message: string;
  code: string;
  httpResponseCode?: number;
  error?: AnyObject;
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

export type FindManyDTO<TModel> = ModelWithoutLogs<TModel> &
  InfinitePaginationDTO;
