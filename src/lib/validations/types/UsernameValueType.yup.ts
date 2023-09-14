import { string } from 'yup';

export const yupUsernameValueType = string()
  .min(3)
  .max(20)
  .test('is-username-value', 'Must be a valid username', () => true);
