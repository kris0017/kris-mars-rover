const { getSplitSeparator } = require('../utils');

test('getSplitSeparator: should return string with space before word and colons after', () => {
  expect(getSplitSeparator('1')).toBe(' 1:');
});
