import { IdArgs } from '@/lib/models/dto/IdArgs.dto';
import { object } from 'yup';

import { yupIdValueType } from './types/IdValueType.yup';

export const idArgsSchema = object<IdArgs>({
  id: yupIdValueType,
});
