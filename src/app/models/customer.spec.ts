import { Customer } from './customer';

describe('Customer', () => {
  it('should create an instance', () => {
    expect(new Customer(1, 'prospect', '渡辺鈑金工業', '123-4567', '東京都', '板橋区', '弥生町')).toBeTruthy();
  });
});
