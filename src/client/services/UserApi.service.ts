import { ApiService } from '@/client/services/Api.service';
import { HashArgs } from '@/lib/models/dto/HashArgs.dto';
import { UserGetByHashResponse } from '@/lib/models/dto/UserGetByHashResponse.dto';

const URL = '/api/user';

class UserApi extends ApiService {
  constructor() {
    super(URL);
  }

  async getByHash(args: Required<HashArgs>) {
    const response = await this.get<UserGetByHashResponse>(`/hash/${args.hash}`);
    return await response.json();
  }
}

export default new UserApi();
