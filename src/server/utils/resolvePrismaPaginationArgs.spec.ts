import { resolvePrismaPaginationArgs } from './resolvePrismaPaginationArgs';

describe('resolvePrismaPaginationArgs', () => {
  it('should resolve page', () => {
    expect(
      resolvePrismaPaginationArgs({
        itemsPerPage: 2,
        page: 2,
      }),
    ).toEqual({
      skip: 2,
      take: 3,
    });
  });

  it('should resolve itemsPerPage', () => {
    expect(
      resolvePrismaPaginationArgs({
        itemsPerPage: 2,
        page: 1,
      }),
    ).toEqual({
      skip: 0,
      take: 3,
    });
  });
});
