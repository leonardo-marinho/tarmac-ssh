import { resolvePrismaPaginationArgs } from './resolvePrismaPaginationArgs';

describe('resolvePrismaPaginationArgs', () => {
  it('should resolve page', () => {
    expect(
      resolvePrismaPaginationArgs({
        page: 2,
        itemsPerPage: 2,
      }),
    ).toEqual({
      take: 3,
      skip: 2,
    });
  });

  it('should resolve itemsPerPage', () => {
    expect(
      resolvePrismaPaginationArgs({
        page: 1,
        itemsPerPage: 2,
      }),
    ).toEqual({
      take: 3,
      skip: 0,
    });
  });
});
