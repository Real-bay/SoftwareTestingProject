// toNumber.js.test.jsx
// Manual test suite for toNumber.js

import { describe, it, expect } from "vitest";
import toNumber from "../src/toNumber.js";

describe("toNumber.js - test suite", () => {

    it("TC018 - handles hexadecimal", () => {
        expect(toNumber(0xA)).toBe(10);
    });

    it("TC019 - handles Infinity", () => {
        expect(toNumber(Infinity)).toBe(Infinity);
        expect(toNumber(-Infinity)).toBe(-Infinity);
    });

    it("TC020 - converts numeric strings to numbers", () => {
        expect(toNumber("0")).toBe(0);
        expect(toNumber("42")).toBe(42);
        expect(toNumber("3.14")).toBeCloseTo(3.14, 10);
    });

    it("TC021 - coerces booleans and null", () => {
        expect(toNumber(true)).toBe(1);
        expect(toNumber(false)).toBe(0);
        expect(toNumber(null)).toBe(0);
    });
});