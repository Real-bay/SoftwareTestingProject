// tests/add.ai.test.jsx
// -----------------------------------------------------------------------------
// AI-generated test suite for add.js
//
// Goal:
//   - Exercise createMathOperation's branching thoroughly:
//       * both arguments undefined (default value)
//       * only one argument defined
//       * numeric vs. string branch
//       * mixed types (null, boolean, objects, NaN)
//   - Go beyond the manual test plan in terms of:
//       * input type variety
//       * boundary and corner cases
//       * explicit documentation of observed behavior
//
// NOTE:
//   - These tests do NOT assume that invalid types must throw.
//     Instead, they aim to capture the actual behavior of the current
//     implementation (numeric coercion, string concatenation, NaN propagation).
// -----------------------------------------------------------------------------

import { describe, it, expect } from "vitest";
import add from "../src/add.js";

describe("add.js - AI-generated test suite", () => {
    // ---------------------------------------------------------------------------
    // AI_TC001: Both arguments undefined → default value should be returned
    //
    // This hits the first branch in createMathOperation:
    //   if (value === undefined && other === undefined) return defaultValue;
    // For add.js the defaultValue is 0.
    // ---------------------------------------------------------------------------
    it("AI_TC001 - returns default value when both arguments are undefined", () => {
        expect(add(undefined, undefined)).toBe(0);
    });

    // ---------------------------------------------------------------------------
    // AI_TC002: Only left argument defined → returned as-is
    //
    // Branch:
    //   if (value !== undefined && other === undefined) return value;
    // No type coercion or conversion should happen here.
    // ---------------------------------------------------------------------------
    it("AI_TC002 - returns left operand when right operand is undefined (number)", () => {
        expect(add(5, undefined)).toBe(5);
    });

    it("AI_TC003 - returns left operand when right operand is undefined (string)", () => {
        expect(add("left", undefined)).toBe("left");
    });

    // ---------------------------------------------------------------------------
    // AI_TC004: Only right argument defined → returned as-is
    //
    // Branch:
    //   if (other !== undefined && value === undefined) return other;
    // ---------------------------------------------------------------------------
    it("AI_TC004 - returns right operand when left operand is undefined (number)", () => {
        expect(add(undefined, 7)).toBe(7);
    });

    it("AI_TC005 - returns right operand when left operand is undefined (string)", () => {
        expect(add(undefined, "right")).toBe("right");
    });

    // ---------------------------------------------------------------------------
    // AI_TC006: Pure numeric addition (integer and negative values)
    //
    // Exercises the "numeric" path of createMathOperation:
    //   else { value = baseToNumber(value); other = baseToNumber(other); }
    // ---------------------------------------------------------------------------
    it("AI_TC006 - adds positive integers correctly", () => {
        expect(add(6, 4)).toBe(10);
        expect(add(0, 0)).toBe(0);
        expect(add(123, 456)).toBe(579);
    });

    it("AI_TC007 - adds negative and mixed-sign integers correctly", () => {
        expect(add(-3, -7)).toBe(-10);
        expect(add(-10, 5)).toBe(-5);
        expect(add(5, -10)).toBe(-5);
    });

    // ---------------------------------------------------------------------------
    // AI_TC008: Floating point behavior
    //
    // Still numeric path, but we use approximate comparison because of IEEE 754.
    // ---------------------------------------------------------------------------
    it("AI_TC008 - handles floating point numbers (approximate equality)", () => {
        expect(add(0.1, 0.2)).toBeCloseTo(0.3, 10);
        expect(add(1.01, 1.99)).toBeCloseTo(3.0, 10);
    });

    // ---------------------------------------------------------------------------
    // AI_TC009: NaN and Infinity propagation
    //
    // For NaN, any arithmetic operation should result in NaN.
    // For Infinity, we check that normal arithmetic rules apply.
    // ---------------------------------------------------------------------------
    it("AI_TC009 - returns NaN when one side is NaN", () => {
        const result1 = add(Number.NaN, 1);
        const result2 = add(2, Number.NaN);

        expect(result1).toBeNaN();
        expect(result2).toBeNaN();
    });

    it("AI_TC010 - handles Infinity and -Infinity in numeric mode", () => {
        expect(add(Infinity, 1)).toBe(Infinity);
        expect(add(-Infinity, -1)).toBe(-Infinity);

        // +/- Infinity combination results in NaN in JavaScript arithmetic
        const result = add(-Infinity, Infinity);
        expect(result).toBeNaN();
    });

    // ---------------------------------------------------------------------------
    // AI_TC011: Boolean inputs
    //
    // baseToNumber is expected to follow Number(...) semantics:
    //   true → 1, false → 0
    // ---------------------------------------------------------------------------
    it("AI_TC011 - coerces boolean operands in numeric mode", () => {
        expect(add(true, false)).toBe(1);  // 1 + 0
        expect(add(true, true)).toBe(2);   // 1 + 1
        expect(add(false, false)).toBe(0); // 0 + 0
    });

    // ---------------------------------------------------------------------------
    // AI_TC012: null handling
    //
    // Number(null) === 0, so we expect null to be treated as 0 in numeric mode.
    // ---------------------------------------------------------------------------
    it("AI_TC012 - treats null as 0 in numeric mode", () => {
        expect(add(null, 1)).toBe(1);
        expect(add(2, null)).toBe(2);
        expect(add(null, null)).toBe(0);
    });

    // ---------------------------------------------------------------------------
    // AI_TC013: String branch - pure strings
    //
    // Branch in createMathOperation:
    //   if (typeof value === 'string' || typeof other === 'string') {
    //     value = baseToString(value);
    //     other = baseToString(other);
    //   }
    // After that, operator is string concatenation.
    // ---------------------------------------------------------------------------
    it("AI_TC013 - concatenates two strings when both operands are strings", () => {
        expect(add("hello", "world")).toBe("helloworld");
        expect(add("6", "4")).toBe("64");
    });

    // ---------------------------------------------------------------------------
    // AI_TC014: String branch - mixed string and number
    //
    // Any string presence triggers string mode; numeric operand is converted
    // to string and concatenated.
    // ---------------------------------------------------------------------------
    it("AI_TC014 - concatenates when one operand is string and the other is number", () => {
        expect(add("value:", 42)).toBe("value:42");
        expect(add(10, " items")).toBe("10 items");
    });

    // ---------------------------------------------------------------------------
    // AI_TC015: String branch - interaction with null and booleans
    //
    // Ensures baseToString is exercised with non-string inputs.
    // We don't assert implementation details of baseToString formatting here,
    // only that the result is a string and contains both pieces of information.
    // ---------------------------------------------------------------------------
    it("AI_TC015 - coerces non-string values to strings in string mode", () => {
        const res1 = add("prefix-", null);
        const res2 = add("flag:", true);

        expect(typeof res1).toBe("string");
        expect(res1.includes("prefix-")).toBe(true);

        expect(typeof res2).toBe("string");
        expect(res2.includes("flag:")).toBe(true);
        expect(res2.toLowerCase()).toContain("true");
    });

    // ---------------------------------------------------------------------------
    // AI_TC016: Objects with custom valueOf - numeric path
    //
    // This test exercises baseToNumber with objects and ensures it uses
    // the object's numeric representation (via valueOf / Number()).
    // ---------------------------------------------------------------------------
    it("AI_TC016 - supports objects with numeric valueOf in numeric mode", () => {
        const left = { valueOf: () => 10 };
        const right = { valueOf: () => 5 };

        expect(add(left, right)).toBe(15);
    });

    // ---------------------------------------------------------------------------
    // AI_TC017: Objects with custom toString - string path
    //
    // When at least one operand is a string, both go through baseToString.
    // We verify that toString-based representations are used for concatenation.
    // ---------------------------------------------------------------------------
    it("AI_TC017 - uses object.toString() in string mode", () => {
        const obj = {
            toString() {
                return "[object custom]";
            },
        };

        const result = add("prefix:", obj);
        expect(result).toBe("prefix:[object custom]");
    });

    // ---------------------------------------------------------------------------
    // AI_TC018: Left/right argument symmetry in numeric mode
    //
    // Ensures that addition is commutative for numeric inputs and there is no
    // hidden ordering bug with baseToNumber.
    // ---------------------------------------------------------------------------
    it("AI_TC018 - addition is commutative for numeric inputs", () => {
        expect(add(1, 2)).toBe(add(2, 1));
        expect(add(-5, 10)).toBe(add(10, -5));
        expect(add(0.25, 0.5)).toBeCloseTo(add(0.5, 0.25), 10);
    });
});
