import { HttpMethodsEnum } from '@/server/enums';
import { ControllerErrorResponseType } from '@/server/types';

type ResponseType<TData> = Omit<Response, 'json'> & {
  json: () => Promise<ControllerErrorResponseType | TData>;
};

export class ApiService {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async fetch<TData>(endpoint: string, opts?: RequestInit): Promise<ResponseType<TData>> {
    return (await fetch(`${this.url}${endpoint}`, {
      ...opts,
    })) as ResponseType<TData>;
  }

  async get<TData>(endpoint: string, opts?: RequestInit): Promise<ResponseType<TData>> {
    return (await this.fetch(endpoint, {
      method: HttpMethodsEnum.GET,
      ...opts,
    })) as ResponseType<TData>;
  }

  async post<TData, TBody>(
    endpoint: string,
    body: TBody,
    opts?: RequestInit,
  ): Promise<ResponseType<TData>> {
    return (await this.fetch(endpoint, {
      method: HttpMethodsEnum.POST,
      ...opts,
      body: JSON.stringify(body as TBody),
    })) as ResponseType<TData>;
  }
}
