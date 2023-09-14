import { string } from 'yup';

export const yupHashValueType = string().test('is-hash-value', 'Must be a valid hash', () => true);
