// filter.js.test.jsx
// Manual test suite for filter.js

import { describe, it, expect } from "vitest";
import filter from "../src/filter.js";

describe("filter.js - test suite", () => {

  it("TC016 - filters even numbers from an array", () => {
    const input = [1, 2, 3, 4, 5];
    const result = filter(input, (n) => n % 2 === 0);
    expect(result).toEqual([2, 4]);
  });

  it("TC017 - keeps all elements when predicate always returns true (symbols)", () => {
    const sym = Symbol("1");
    const input = [sym];
    const result = filter(input, () => true);
    expect(result).toEqual([sym]);
  });
})