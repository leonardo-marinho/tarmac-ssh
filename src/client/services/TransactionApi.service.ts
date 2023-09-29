import { ApiService } from '@/client/services/Api.service';
import { GetTotalAmountByUserResponse } from '@/lib/models/dto/GetTotalAmountByUserResponse.dto';
import { HashArgs } from '@/lib/models/dto/HashArgs.dto';
import { SuccessResponse } from '@/lib/models/dto/SuccessResponse.dto';

const URL = '/api/leaderboard';

class TransactionApi extends ApiService {
  constructor() {
    super(URL);
  }

  async getTotalAmountByUser(args: Required<HashArgs>) {
    const response = await this.get<GetTotalAmountByUserResponse>(`/user/${args.hash}`);
    return await response.json();
  }

  async refill(args: Required<HashArgs>): Promise<boolean> {
    const response = await this.post<SuccessResponse, HashArgs>(`/refill`, args);
    return ((await response.json()) as SuccessResponse).success;
  }
}

export default new TransactionApi();
