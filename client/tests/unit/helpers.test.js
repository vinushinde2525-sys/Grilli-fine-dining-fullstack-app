import { formatCurrency, truncate, sleep } from '../../src/utils/helpers';

describe('formatCurrency', function() {
  test('formats a positive number as USD', function() {
    expect(formatCurrency(19.5)).toBe('$19.50');
  });

  test('returns $0.00 for null/undefined', function() {
    expect(formatCurrency(null)).toBe('$0.00');
    expect(formatCurrency(undefined)).toBe('$0.00');
  });

  test('formats zero correctly', function() {
    expect(formatCurrency(0)).toBe('$0.00');
  });
});

describe('truncate', function() {
  test('shortens strings longer than n and appends ellipsis', function() {
    expect(truncate('Grilled Chicken Supreme', 10)).toBe('Grilled Ch...');
  });

  test('leaves short strings untouched', function() {
    expect(truncate('Soup', 10)).toBe('Soup');
  });

  test('handles falsy input without throwing', function() {
    expect(truncate('', 10)).toBe('');
    expect(truncate(null, 10)).toBe(null);
  });
});

describe('sleep', function() {
  test('resolves after the given delay', async function() {
    var start = Date.now();
    await sleep(20);
    expect(Date.now() - start).toBeGreaterThanOrEqual(15);
  });
});
