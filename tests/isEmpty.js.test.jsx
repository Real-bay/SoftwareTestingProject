// isEmpty.js.test.jsx
// Manual test suite for isEmpty.js

import { describe, it, expect } from 'vitest';
import isEmpty from '../src/isEmpty.js';

describe('isEmpty.js - test suite', () => {
  it('TC025 - returns true for null and undefined', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  it('TC026 - returns false for non-empty arrays', () => {
    expect(isEmpty(['Jyri', 'Matias'])).toBe(false);
    expect(isEmpty('x')).toBe(false);
  });

  it('TC027 - returns true for empty objects', () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty({})).toBe(true);
  });
});
