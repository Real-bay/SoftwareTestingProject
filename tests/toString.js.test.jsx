// toString.js.test.jsx
// Manual test suite for toString.js


import { describe, it, expect } from "vitest";
import toString from "../src/toString.js";

describe("toString.js - test suite", () => {

    it("TC030 - converts null and undefined to empty string", () => {
        expect(toString(null)).toBe("");
        expect(toString(undefined)).toBe("");
    });

    it("TC031 - converts arrays to comma-separated strings", () => {
        expect(toString([200, 300, 400])).toBe("200,300,400");
        expect(toString([])).toBe("");
    });

    it("TC032 - converts numbers to strings and preserves -0 sign", () => {
        expect(toString(0)).toBe("0");
        expect(toString(42)).toBe("42");
        expect(toString(-0)).toBe("-0");
    });
});
