import { resolveInfinitePaginationResponse } from './resolveInfinitePaginationResponse';

describe('resolvePaginatedResponse', () => {
  it('should resolve empty array', () => {
    expect(resolveInfinitePaginationResponse([])).toEqual({
      page: 1,
      hasMore: false,
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
      page: 1,
      hasMore: false,
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
          page: 1,
          itemsPerPage: 2,
        },
      ),
    ).toEqual({
      page: 1,
      hasMore: true,
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
      page: 1,
      hasMore: false,
      records: [
        {
          name: 'Alex',
        },
      ],
    });
  });
});
