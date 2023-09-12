import { resolveBulkArgs } from './resolveBulkArgs';

describe('resolveBulkArgs', () => {
  it('should resolve empty array', () => {
    expect(resolveBulkArgs([])).toBeUndefined();
  });

  it('should resolve undefined value', () => {
    expect(
      resolveBulkArgs([
        {
          key: 'name',
          value: undefined,
        },
      ]),
    ).toBeUndefined();
  });

  it('should resolve undefined value', () => {
    expect(
      resolveBulkArgs([
        {
          key: 'name',
          value: undefined,
        },
      ]),
    ).toBeUndefined();
  });

  it('should resolve many values without black space after comma', () => {
    expect(
      resolveBulkArgs([
        {
          key: 'name',
          value: 'Alex,John',
        },
      ]),
    ).toEqual({
      OR: [
        {
          name: 'Alex',
        },
        {
          name: 'John',
        },
      ],
    });
  });

  it('should resolve many values with black space after comma', () => {
    expect(
      resolveBulkArgs([
        {
          key: 'name',
          value: 'Alex, John',
        },
      ]),
    ).toEqual({
      OR: [
        {
          name: 'Alex',
        },
        {
          name: 'John',
        },
      ],
    });
  });

  it('should resolve single key with single value', () => {
    expect(
      resolveBulkArgs([
        {
          key: 'name',
          value: 'Alex',
        },
      ]),
    ).toEqual({
      OR: [
        {
          name: 'Alex',
        },
      ],
    });
  });

  it('should resolve single key with many value', () => {
    expect(
      resolveBulkArgs([
        {
          key: 'name',
          value: 'Alex, John, Doe',
        },
      ]),
    ).toEqual({
      OR: [
        {
          name: 'Alex',
        },
        {
          name: 'John',
        },
        {
          name: 'Doe',
        },
      ],
    });
  });

  it('should resolve many keys with single value each', () => {
    expect(
      resolveBulkArgs([
        {
          key: 'name',
          value: 'Alex',
        },
        {
          key: 'id',
          value: '4',
        },
        {
          key: 'region',
          value: 'en-US',
        },
      ]),
    ).toEqual({
      OR: [
        {
          name: 'Alex',
        },
        {
          id: 4,
        },
        {
          region: 'en-US',
        },
      ],
    });
  });

  it('should resolve many keys with many value each', () => {
    expect(
      resolveBulkArgs([
        {
          key: 'name',
          value: 'Alex',
        },
        {
          key: 'id',
          value: '4,5,6',
        },
        {
          key: 'region',
          value: 'en-US, en-GB',
        },
      ]),
    ).toEqual({
      OR: [
        {
          name: 'Alex',
        },
        {
          id: 4,
        },
        {
          id: 5,
        },
        {
          id: 6,
        },
        {
          region: 'en-US',
        },
        {
          region: 'en-GB',
        },
      ],
    });
  });

  it('should parseInt string numbers', () => {
    expect(
      resolveBulkArgs([
        {
          key: 'id',
          value: '4.342,5,-6',
        },
      ]),
    ).toEqual({
      OR: [
        {
          id: 4.342,
        },
        {
          id: 5,
        },
        {
          id: -6,
        },
      ],
    });
  });

  it('should parseInt and object string numbers', () => {
    expect(
      resolveBulkArgs<{ id: number; num: number }>(
        [
          {
            key: 'id',
            value: '4,5,6',
          },
        ],
        {
          num: '1',
        },
      ),
    ).toEqual({
      OR: [
        {
          id: 4,
        },
        {
          id: 5,
        },
        {
          id: 6,
        },
      ],
    });
  });
});
