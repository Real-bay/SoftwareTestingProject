// tests/eq.ai.test.jsx
// -----------------------------------------------------------------------------
// AI-generated test suite for eq.js
//
// Target function:
//
//   function eq(value, other) {
//     return value == other || (value !== value && other !== other)
//   }
//
// Properties:
//   - Uses loose equality (==) with an explicit NaN-handling branch.
//   - Effectively approximates SameValueZero for most primitive cases,
//     but differs from documentation for some boxed values (e.g. 'a' vs Object('a')).
//
// Goals of this suite:
//   - Cover a wide variety of type combinations:
//       * primitives: number, string, boolean, null/undefined, symbol
//       * NaN, +/-0, Infinity
//       * boxed primitives (Object(…))
//       * objects, arrays, functions
//   - Hit both "== branch" and "NaN special-case branch" explicitly.
//   - Surface interesting differences between documentation comments and
//     actual implementation (e.g., 'a' vs Object('a')).
// -----------------------------------------------------------------------------

import { describe, it, expect } from "vitest";
import eq from "../src/eq.js";

describe("eq.js - AI-generated test suite", () => {
  // ---------------------------------------------------------------------------
  // AI_TC019: Strictly identical primitive values
  //
  // Simple sanity checks that equal primitives are detected as equal.
  // ---------------------------------------------------------------------------
  it("AI_TC019 - returns true for identical primitive values", () => {
    expect(eq(1, 1)).toBe(true);
    expect(eq("a", "a")).toBe(true);
    expect(eq(true, true)).toBe(true);
    expect(eq(false, false)).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // AI_TC020: Different primitive values → false
  //
  // Smoke test that clearly different primitives are not considered equal.
  // ---------------------------------------------------------------------------
  it("AI_TC020 - returns false for clearly different primitive values", () => {
    expect(eq(1, 2)).toBe(false);
    expect(eq("a", "b")).toBe(false);
    expect(eq(true, false)).toBe(false);
    expect(eq(0, 1)).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // AI_TC021: SameValueZero NaN behavior
  //
  // Special case: NaN is not == to itself in JavaScript, so the second part of
  // the expression (value !== value && other !== other) must handle it.
  // ---------------------------------------------------------------------------
  it("AI_TC021 - treats NaN and NaN as equal", () => {
    expect(eq(Number.NaN, Number.NaN)).toBe(true);

    const a = 0 / 0;
    const b = 0 / 0;
    expect(eq(a, b)).toBe(true);

    expect(eq(Number.NaN, 1)).toBe(false);
    expect(eq(Number.NaN, "NaN")).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // AI_TC022: +0 and -0
  //
  // SameValueZero considers +0 and -0 equal. Here, this falls through to
  // the loose equality branch (0 == -0 → true).
  // ---------------------------------------------------------------------------
  it("AI_TC022 - treats +0 and -0 as equal", () => {
    expect(eq(0, -0)).toBe(true);
    expect(eq(-0, 0)).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // AI_TC023: null and undefined
  //
  // Loose equality treats null and undefined as equal:
  //   null == undefined → true
  // but not equal to other values:
  //   null == 0 → false, undefined == 0 → false
  // ---------------------------------------------------------------------------
  it("AI_TC023 - follows loose equality semantics for null and undefined", () => {
    expect(eq(null, undefined)).toBe(true);
    expect(eq(undefined, null)).toBe(true);

    expect(eq(null, 0)).toBe(false);
    expect(eq(undefined, 0)).toBe(false);
    expect(eq(null, "")).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // AI_TC024: Type coercion in loose equality
  //
  // Because eq uses "==", the usual JS coercion rules apply:
  //   0 == "0" → true
  //   1 == "1" → true
  //   0 == false → true
  //   1 == true → true
  // ---------------------------------------------------------------------------
  it("AI_TC024 - applies loose equality coercion rules", () => {
    expect(eq(0, "0")).toBe(true);
    expect(eq("0", 0)).toBe(true);
    expect(eq(1, "1")).toBe(true);

    expect(eq(0, false)).toBe(true);
    expect(eq(false, 0)).toBe(true);
    expect(eq(1, true)).toBe(true);
    expect(eq(true, 1)).toBe(true);

    // Some non-equalities:
    expect(eq(2, "3")).toBe(false);
    expect(eq(true, "2")).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // AI_TC025: Empty string vs false vs zero
  //
  // Classic coercion corner cases:
  //   '' == 0 → true
  //   '' == false → true
  // ---------------------------------------------------------------------------
  it("AI_TC025 - covers empty string coercion edge-cases", () => {
    expect(eq("", 0)).toBe(true);
    expect(eq(0, "")).toBe(true);

    expect(eq("", false)).toBe(true);
    expect(eq(false, "")).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // AI_TC026: Objects and reference equality
  //
  // For non-primitive objects, == compares references. Two different objects
  // with identical content are not equal, but the same reference is.
  // ---------------------------------------------------------------------------
  it("AI_TC026 - compares object references, not deep equality", () => {
    const obj = { a: 1 };
    const sameRef = obj;
    const otherObj = { a: 1 };

    expect(eq(obj, sameRef)).toBe(true);
    expect(eq(obj, otherObj)).toBe(false);

    const arr = [1, 2, 3];
    const sameArrRef = arr;
    const otherArr = [1, 2, 3];

    expect(eq(arr, sameArrRef)).toBe(true);
    expect(eq(arr, otherArr)).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // AI_TC027: Functions - same vs different reference
  //
  // Functions are also objects, so reference equality is all that matters.
  // ---------------------------------------------------------------------------
  it("AI_TC027 - uses reference equality for functions", () => {
    function f() {}
    function g() {}

    const alias = f;

    expect(eq(f, alias)).toBe(true);
    expect(eq(f, g)).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // AI_TC028: Boxed primitives - Number and Boolean
  //
  // With loose equality:
  //   new Number(1) == 1 → true
  //   new Boolean(true) == true → true
  // ---------------------------------------------------------------------------
  it("AI_TC028 - treats boxed Number/Boolean consistent with loose equality", () => {
    expect(eq(new Number(1), 1)).toBe(true);
    expect(eq(1, new Number(1))).toBe(true);

    expect(eq(new Boolean(true), true)).toBe(true);
    expect(eq(true, new Boolean(true))).toBe(true);

    // Different numeric values should not be equal
    expect(eq(new Number(2), 1)).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // AI_TC029: Boxed strings - documentation vs implementation
  //
  // The docstring example says:
  //   eq('a', Object('a')) // => false
  //
  // But this implementation uses "==" which yields:
  //   'a' == Object('a') → true
  //
  // This test intentionally captures the *actual* behavior, which is at odds
  // with the documented example.
  // ---------------------------------------------------------------------------
  it("AI_TC029 - reveals mismatch between doc comment and implementation for 'a' vs Object('a')", () => {
    const boxed = new Object("a");

    // Actual behavior with loose equality:
    expect(eq("a", boxed)).toBe(true);
    expect(eq(boxed, "a")).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // AI_TC030: Symbols
  //
  // Loose equality on Symbols works such that only the exact same Symbol
  // instance is equal to itself. Two different Symbols with same description
  // are not equal.
  // ---------------------------------------------------------------------------
  it("AI_TC030 - handles Symbols via reference equality", () => {
    const s1 = Symbol("x");
    const s2 = Symbol("x");
    const alias = s1;

    expect(eq(s1, alias)).toBe(true); // same reference
    expect(eq(s1, s2)).toBe(false);   // different Symbol instances
  });

  // ---------------------------------------------------------------------------
  // AI_TC031: Infinity variants
  //
  // Loose equality considers identical infinities equal, but Infinity and
  // -Infinity are not equal.
  // ---------------------------------------------------------------------------
  it("AI_TC031 - handles Infinity and -Infinity", () => {
    expect(eq(Infinity, Infinity)).toBe(true);
    expect(eq(-Infinity, -Infinity)).toBe(true);
    expect(eq(Infinity, -Infinity)).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // AI_TC032: Cross-type object vs primitive comparison
  //
  // Objects with custom valueOf/toString may coerce to primitives under "==".
  // Here we check a couple of representative cases.
  // ---------------------------------------------------------------------------
  it("AI_TC032 - coerces objects with custom valueOf / toString", () => {
    const numLike = {
      valueOf() {
        return 10;
      },
    };

    const strLike = {
      toString() {
        return "42";
      },
    };

    expect(eq(numLike, 10)).toBe(true); // valueOf used for coercion
    expect(eq(strLike, 42)).toBe(true); // "42" == 42 → true
  });

  // ---------------------------------------------------------------------------
  // AI_TC033: Asymmetry checks - ensure eq is symmetric
  //
  // For an equality function we expect eq(a, b) === eq(b, a) in all cases.
  // These assertions use a few tricky pairs to ensure symmetry.
  // ---------------------------------------------------------------------------
  it("AI_TC033 - eq is symmetric for various tricky pairs", () => {
    const pairs = [
      [0, ""],
      [null, undefined],
      [Number.NaN, Number.NaN],
      [1, "1"],
      [false, 0],
      [new Object("a"), "a"],
    ];

    for (const [a, b] of pairs) {
      expect(eq(a, b)).toBe(eq(b, a));
    }
  });
});
