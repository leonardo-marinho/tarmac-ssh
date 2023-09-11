import { DEFAULT_ITEMS_PER_PAGE } from '../constants';
import { resolveInfinitePagination } from './resolveInfinitePagination';

describe('resolveInfinitePagination', () => {
  it('should resolve empty object', () => {
    expect(resolveInfinitePagination({})).toEqual({
      page: 1,
      itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
    });
  });

  it('should resolve page', () => {
    expect(
      resolveInfinitePagination({
        page: '2',
      }),
    ).toEqual({
      page: 2,
      itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
    });
  });

  it('should resolve itemsPerPage', () => {
    expect(
      resolveInfinitePagination({
        itemsPerPage: '2',
      }),
    ).toEqual({
      page: 1,
      itemsPerPage: 2,
    });
  });

  it('should resolve page and itemsPerPage', () => {
    expect(
      resolveInfinitePagination({
        page: '2',
        itemsPerPage: '2',
      }),
    ).toEqual({
      page: 2,
      itemsPerPage: 2,
    });
  });

  it('should resolve page and itemsPerPage with invalid values', () => {
    expect(
      resolveInfinitePagination({
        page: 'a',
        itemsPerPage: 'a',
      }),
    ).toEqual({
      page: 1,
      itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
    });
  });
});
