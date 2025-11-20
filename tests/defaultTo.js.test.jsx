// defaultTo.js.test.jsx
// Manual test suite for defaultTo.js

import { describe, it, expect } from "vitest";
import defaultTo from "../src/defaultTo.js";

describe("defaultTo.js - test suite", () => {

    it("TC027 - returns the value when it is defined and not NaN", () => {
        expect(defaultTo(5, 10)).toBe(5);
        expect(defaultTo("correct", "default")).toBe("correct");
    });

    it("TC028 - returns default for null and undefined", () => {
        expect(defaultTo(null, 2025)).toBe(2025);
        expect(defaultTo(undefined, 2025)).toBe(2025);
    });

    it("TC029 - returns default for NaN", () => {
        expect(defaultTo(Number.NaN, 1)).toBe(1);
    });

});
