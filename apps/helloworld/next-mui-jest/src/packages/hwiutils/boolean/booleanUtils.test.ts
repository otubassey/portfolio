import BooleanUtils from "./booleanUtils";

describe("BooleanUtils", () => {
    describe("isBoolean", () => {
        it("should return true for boolean values", () => {
            expect(BooleanUtils.isBoolean(true)).toBe(true);
            expect(BooleanUtils.isBoolean(false)).toBe(true);
        });
        it("should return true for boolean strings when checkBooleanString is true", () => {
            expect(BooleanUtils.isBoolean("true", true)).toBe(true);
            expect(BooleanUtils.isBoolean("false", true)).toBe(true);
        });
        it("should return false for non-boolean values", () => {
            expect(BooleanUtils.isBoolean(1)).toBe(false);
            expect(BooleanUtils.isBoolean("hello")).toBe(false);
            expect(BooleanUtils.isBoolean(null)).toBe(false);
            expect(BooleanUtils.isBoolean(undefined)).toBe(false);
        });
        it("should return false for boolean strings when checkBooleanString is false or not provided", () => {
            expect(BooleanUtils.isBoolean("true")).toBe(false);
            expect(BooleanUtils.isBoolean("false")).toBe(false);
            expect(BooleanUtils.isBoolean("true", false)).toBe(false);
            expect(BooleanUtils.isBoolean("false", false)).toBe(false);
        });
    });
    describe("isFalsy", () => {
        it("should return false for truthy values", () => {
            expect(BooleanUtils.isFalsy(true)).toBe(false);
            expect(BooleanUtils.isFalsy(1)).toBe(false);
            expect(BooleanUtils.isFalsy(-1)).toBe(false);
            expect(BooleanUtils.isFalsy("hello")).toBe(false);
            expect(BooleanUtils.isFalsy("true")).toBe(false);
            expect(BooleanUtils.isFalsy("false")).toBe(false);
        });   
        it("should return true for falsy values", () => {
            expect(BooleanUtils.isFalsy(false)).toBe(true);
            expect(BooleanUtils.isFalsy(0)).toBe(true);
            expect(BooleanUtils.isFalsy("")).toBe(true);
            expect(BooleanUtils.isFalsy(null)).toBe(true);
            expect(BooleanUtils.isFalsy(undefined)).toBe(true);
        });
        it("should return true when checkBooleanString is true", () => {
            expect(BooleanUtils.isFalsy("", true)).toBe(true);
            expect(BooleanUtils.isFalsy(0, true)).toBe(true);
            expect(BooleanUtils.isFalsy(false, true)).toBe(true);
            expect(BooleanUtils.isFalsy("false", true)).toBe(true);
            expect(BooleanUtils.isFalsy(null, true)).toBe(true);
            expect(BooleanUtils.isFalsy(undefined, true)).toBe(true);
        });
        it("should return false when checkBooleanString is true", () => {
            expect(BooleanUtils.isFalsy(1, true)).toBe(false);
            expect(BooleanUtils.isFalsy(-1, true)).toBe(false);
            expect(BooleanUtils.isFalsy(true, true)).toBe(false);
            expect(BooleanUtils.isFalsy("true", true)).toBe(false);
        });
    });
    describe("isTruthy", () => {
        it("should return false for falsy values", () => {
            expect(BooleanUtils.isTruthy(false)).toBe(false);
            expect(BooleanUtils.isTruthy(0)).toBe(false);
            expect(BooleanUtils.isTruthy("")).toBe(false);
            expect(BooleanUtils.isTruthy(null)).toBe(false);
            expect(BooleanUtils.isTruthy(undefined)).toBe(false);
        });
        it("should return true for truthy values", () => {
            expect(BooleanUtils.isTruthy(true)).toBe(true);
            expect(BooleanUtils.isTruthy(1)).toBe(true);
            expect(BooleanUtils.isTruthy(-1)).toBe(true);
            expect(BooleanUtils.isTruthy("hello")).toBe(true);
            expect(BooleanUtils.isTruthy("true")).toBe(true);
            expect(BooleanUtils.isTruthy("false")).toBe(true);
            expect(BooleanUtils.isTruthy({})).toBe(true);
            expect(BooleanUtils.isTruthy([])).toBe(true);
        });
        it("should return true when checkBooleanString is true", () => {
            expect(BooleanUtils.isTruthy(true, true)).toBe(true);
            expect(BooleanUtils.isTruthy("true", true)).toBe(true);
            expect(BooleanUtils.isTruthy(1, true)).toBe(true);
            expect(BooleanUtils.isTruthy(-1, true)).toBe(true);
        });
        it("should return false when checkBooleanString is true", () => {
            expect(BooleanUtils.isTruthy("false", true)).toBe(false);
            expect(BooleanUtils.isTruthy(false, true)).toBe(false);
            expect(BooleanUtils.isTruthy(null, true)).toBe(false);
            expect(BooleanUtils.isTruthy("", true)).toBe(false);
            expect(BooleanUtils.isTruthy("hello", true)).toBe(false);
            expect(BooleanUtils.isTruthy(0, true)).toBe(false);
            expect(BooleanUtils.isTruthy(undefined, true)).toBe(false);
        });
    });
    describe("parse", () => {
        it("should return true for 'true' string", () => {
            expect(BooleanUtils.parse("true")).toBe(true);
            expect(BooleanUtils.parse("TrUe")).toBe(true);
        });
        it("should return false for 'false' string", () => {
            expect(BooleanUtils.parse("false")).toBe(false);
            expect(BooleanUtils.parse("fAlSE")).toBe(false);
        });
        it("should return 'undefined' for other strings", () => {
            expect(BooleanUtils.parse("")).toBeUndefined();
            expect(BooleanUtils.parse("hello")).toBeUndefined();
            expect(BooleanUtils.parse("1")).toBeUndefined();
        });
        it("should return 'undefined' for null or undefined input", () => {
            expect(BooleanUtils.parse(null)).toBeUndefined();
            expect(BooleanUtils.parse(undefined)).toBeUndefined();
        });
    });
    describe("toggle", () => {
        it("should toggle boolean values", () => {
            expect(BooleanUtils.toggle(true)).toBe(false);
            expect(BooleanUtils.toggle(false)).toBe(true);
        });
    });
});
