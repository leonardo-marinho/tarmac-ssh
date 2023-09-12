import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';

export const mockUser = (value?: Partial<User>): User => ({
  accountHash: faker.string.uuid(),
  createdAt: faker.date.past(),
  disabled: faker.datatype.boolean(),
  id: faker.number.int({ max: 100, min: 1 }),
  updatedAt: faker.date.past(),
  username: faker.internet.userName(),
  ...value,
});
