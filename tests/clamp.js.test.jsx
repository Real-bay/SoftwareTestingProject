// clamp.js.test.jsx
// Manual test suite for clamp.js

import { describe, it, expect } from "vitest";
import clamp from "../src/clamp.js";

describe("clamp.js - manual test suite", () => {

    it("TC022 - clamps values above upper bound to upper", () => {
        expect(clamp(-100, 100, 2000)).toBe(100);
    });

    it("TC023 - clamps negative values to lower bound in [-1, 1]", () => {
        expect(clamp(-1, 1, -2)).toBe(-1);
    });

    it("TC024 - returns value when it is within [lower, upper]", () => {
        expect(clamp(-100, 100, -5)).toBe(-5);
        expect(clamp(-10, 10, 5)).toBe(5);
    });
});