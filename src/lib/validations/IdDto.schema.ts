import { object } from 'yup';

import { IdDTO } from '../models/dto/Id.dto';
import { yupIdValueType } from './types/IdValueType.yup';

export const idDtoSchema = object<IdDTO>({
  id: yupIdValueType,
});
