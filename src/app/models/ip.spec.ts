import { Ip } from './ip';

describe('Ip', () => {
  it('should create an instance', () => {
    expect(new Ip(1, '127.0.0.1', '2020/06/26')).toBeTruthy();
  });
});
