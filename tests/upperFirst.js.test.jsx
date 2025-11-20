// upperFirst.js.test.jsx
// Manual test suite for upperFirst.js

import { describe, it, expect } from "vitest";
import upperFirst from "../src/upperFirst.js";

describe("upperFirst.js - test suite", () => {

    it("TC033 - uppercases the first character of a lowercase word", () => {
        expect(upperFirst("tuni")).toBe("Tuni");
    });

    it("TC034 - keeps fully uppercase words unchanged", () => {
        expect(upperFirst("TUNI")).toBe("TUNI");
    });

    it("TC035 - returns empty string when input is empty", () => {
        expect(upperFirst("")).toBe("");
    });
});
