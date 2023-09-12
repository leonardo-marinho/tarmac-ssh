import { HttpResponseCodesEnum } from '../enums';

export class ApiException extends Error {
  protected statusCode: HttpResponseCodesEnum;

  constructor(statusCode: HttpResponseCodesEnum, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  get status(): HttpResponseCodesEnum {
    return this.statusCode;
  }
}
