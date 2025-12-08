// isDate.js.test.jsx
// Manual test suite for isDate.js

import { describe, it, expect } from 'vitest';
import isDate from '../src/isDate.js';

describe('isDate.js - test suite', () => {
  it('TC037 - returns true for Date instances', () => {
    expect(isDate(new Date())).toBe(true);
  });

  it('TC038 - returns false for non-Date values', () => {
    expect(isDate('Wed November 05 2025')).toBe(false);
    expect(isDate(12343566789)).toBe(false);
    expect(isDate({})).toBe(false);
    expect(isDate(null)).toBe(false);
  });
});
