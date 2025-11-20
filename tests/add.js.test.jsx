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
})