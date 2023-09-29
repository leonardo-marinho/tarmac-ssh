import { moneyToText } from './moneyToText';

describe('moneyToText function', () => {
  it('should render with symbol', () => {
    expect(moneyToText(10.12345, '$')).toEqual('$ 10.12');
  });

  describe('fixed parameter', () => {
    it('should fix value by 2 by default', () => {
      expect(moneyToText(10.12345, '$')).toEqual('$ 10.12');
    });

    it('should fix value', () => {
      expect(moneyToText(10.12345, '$', 1)).toEqual('$ 10.1');
    });
  });
});
