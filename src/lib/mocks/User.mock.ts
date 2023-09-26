import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';

export const mockUser = (value?: Partial<User>): User => ({
  createdAt: faker.date.past(),
  disabled: faker.datatype.boolean(),
  hash: faker.string.uuid(),
  id: faker.number.int({ max: 100, min: 1 }),
  updatedAt: faker.date.past(),
  username: faker.internet.userName(),
  ...value,
});
