import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';

export const mockUser = (value?: Partial<User>): User => ({
  id: faker.number.int({ min: 1, max: 100 }),
  username: faker.internet.userName(),
  accountHash: faker.string.uuid(),
  disabled: faker.datatype.boolean(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
  ...value,
});
