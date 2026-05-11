const sum = require('./sum');

test('ad 23+45 equal to 68', () => {
    expect(sum(23,45)).toBe(68);
})