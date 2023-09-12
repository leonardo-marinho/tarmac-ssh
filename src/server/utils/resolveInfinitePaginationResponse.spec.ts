import { resolveInfinitePaginationResponse } from './resolveInfinitePaginationResponse';

describe('resolvePaginatedResponse', () => {
  it('should resolve empty array', () => {
    expect(resolveInfinitePaginationResponse([])).toEqual({
      hasMore: false,
      page: 1,
      records: [],
    });
  });

  it('should resolve array with single item', () => {
    expect(
      resolveInfinitePaginationResponse([
        {
          name: 'Alex',
        },
      ]),
    ).toEqual({
      hasMore: false,
      page: 1,
      records: [
        {
          name: 'Alex',
        },
      ],
    });
  });

  it('should resolve hasMore var', () => {
    expect(
      resolveInfinitePaginationResponse(
        [
          {
            name: 'Alex',
          },
          {
            name: 'John',
          },
          {
            name: 'Bob',
          },
        ],
        {
          itemsPerPage: 2,
          page: 1,
        },
      ),
    ).toEqual({
      hasMore: true,
      page: 1,
      records: [
        {
          name: 'Alex',
        },
        {
          name: 'John',
        },
      ],
    });
  });

  it('should resolve non array data', () => {
    expect(
      resolveInfinitePaginationResponse({
        name: 'Alex',
      }),
    ).toEqual({
      hasMore: false,
      page: 1,
      records: [
        {
          name: 'Alex',
        },
      ],
    });
  });
});
