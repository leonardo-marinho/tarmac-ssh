import { object, string } from 'yup';
import { IdDTO } from '../models/dto/Id.dto';

export const IdDtoSchema = object<IdDTO>({
  id: string(),
});
