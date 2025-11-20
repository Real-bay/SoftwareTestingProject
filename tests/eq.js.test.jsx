// eq.js.test.jsx
// Unit tests for eq.js
// These tests follow the Phase 1 manually designed test plan.

import { describe, it, expect } from "vitest";
import eq from "../src/eq.js";

describe("eq.js test suite", () => {

    it("TC011 - Compare same input types", () => {
        expect(eq(1, 1)).toBe(true);
        expect(eq("1", "2")).toBe(false);
        expect(eq(new Object("1"), new Object("1"))).toBe(false);
    })

    it("TC012 - Compare coercion inputs", () => {
        expect(eq(1, "1")).toBe(true);
    })

    it("TC013 - Compare undefined/null values", () => {
        expect(eq(null, null)).toBe(true);
        expect(eq(undefined, null)).toBe(false);
    })
})