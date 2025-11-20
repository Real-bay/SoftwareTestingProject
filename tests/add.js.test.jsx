// add.js.test.jsx
// Unit tests for add.js
// The tests validate arithmetic behavior and type handling.
// These tests follow the Phase 1 manually designed test plan.

import { describe, it, expect } from "vitest";
import add from "../src/add.js";

describe("add.js test suite", () => {

    it("TC001 - Add two whole numbers", () => {
        expect(add(1,1)).toBe(2);
        expect(add(347,128)).toBe(475);
    })

    it("TC002 - Add two decimal numbers", () => {
        expect(add(1.01,1)).toBe(2.01);
        expect(add(27.00003,14.356)).toBe(41.35603);
    })

    it("TC003 - Add two hexadecimal numbers", () => {
        expect(add(0xff,0xA)).toBe(0x109);
    })

    it("TC004 - Add two binary numbers", () => {
        expect(add(0b1010, 0b101)).toBe(0b1111);
    })

    it("TC005 - Add negative numbers", () => {
        expect(add(-1, -1)).toBe(-2);
        expect(add(-365, 1)).toBe(-364);
    })

    it("TC006 - Add two zeros", () => {
        expect(add(0, 0)).toBe(0);
    })

    it("TC007 - Negative and positive infinity", () => {
        expect(() => add(Infinity, Infinity)).toThrow();
        expect(() => add(-Infinity, Infinity)).toThrow();
    })

    it("TC008 - Add strings", () => {
        expect(() => add("12",1)).toThrow();
    })

    it("TC009 - Add undefined/null values", () => {
        expect(() => add(null,1)).toThrow();
        expect(() => add(undefined,1)).toThrow();
    })
})