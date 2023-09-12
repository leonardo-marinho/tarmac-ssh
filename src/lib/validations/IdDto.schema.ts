import { object, string } from 'yup';

import { IdDTO } from '../models/dto/Id.dto';

export const idDtoSchema = object<IdDTO>({
  id: string().required(),
});
