import { ApiService } from '@/client/services/Api.service';
import { AuthSignInResponse } from '@/lib/models/dto/AuthSignInResponse.dto';
import { AuthSignUpArgs } from '@/lib/models/dto/AuthSignUpArgs.dto';
import { AuthSignUpResponse } from '@/lib/models/dto/AuthSignUpResponse.dto';
import { HashArgs } from '@/lib/models/dto/HashArgs.dto';
import { HttpResponseCodesEnum } from '@/server/enums';

const URL = '/api/auth';

class AuthApi extends ApiService {
  constructor() {
    super(URL);
  }

  async signIn(args: HashArgs) {
    const response = await this.post<AuthSignInResponse, HashArgs>(`/signin`, args);
    return await response.json();
  }

  async signUp(args: AuthSignUpArgs): Promise<boolean> {
    const response = await this.post<AuthSignUpResponse, AuthSignUpResponse>(`/signup`, args);
    return response.status === HttpResponseCodesEnum.CREATED;
  }
}

export default new AuthApi();
