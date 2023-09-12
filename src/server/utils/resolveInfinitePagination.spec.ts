import { DEFAULT_ITEMS_PER_PAGE } from '../constants';
import { resolveInfinitePagination } from './resolveInfinitePagination';

describe('resolveInfinitePagination', () => {
  it('should resolve empty object', () => {
    expect(resolveInfinitePagination({})).toEqual({
      itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
      page: 1,
    });
  });

  it('should resolve page', () => {
    expect(
      resolveInfinitePagination({
        page: '2',
      }),
    ).toEqual({
      itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
      page: 2,
    });
  });

  it('should resolve itemsPerPage', () => {
    expect(
      resolveInfinitePagination({
        itemsPerPage: '2',
      }),
    ).toEqual({
      itemsPerPage: 2,
      page: 1,
    });
  });

  it('should resolve page and itemsPerPage', () => {
    expect(
      resolveInfinitePagination({
        itemsPerPage: '2',
        page: '2',
      }),
    ).toEqual({
      itemsPerPage: 2,
      page: 2,
    });
  });

  it('should resolve page and itemsPerPage with invalid values', () => {
    expect(
      resolveInfinitePagination({
        itemsPerPage: 'a',
        page: 'a',
      }),
    ).toEqual({
      itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
      page: 1,
    });
  });
});
