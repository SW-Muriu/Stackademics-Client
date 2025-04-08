import { CamelToUpperCasePipe } from './camel-to-upper-case.pipe';

describe('CamelToUpperCasePipe', () => {
  it('create an instance', () => {
    const pipe = new CamelToUpperCasePipe();
    expect(pipe).toBeTruthy();
  });
});
