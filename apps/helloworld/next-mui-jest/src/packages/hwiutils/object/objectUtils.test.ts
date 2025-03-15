import ObjectUtils from "./objectUtils";

describe("ObjectUtils", () => {
    describe("hasProperty", () => {
        it("should return true if the object has the property", () => {
            const obj = {name: "John", age: 30};

            expect(ObjectUtils.hasProperty(obj, "name")).toBe(true);
            expect(ObjectUtils.hasProperty(obj, "age")).toBe(true);
        });
        it("should return false if the object does not have the property", () => {
            const obj = {name: "John"};

            expect(ObjectUtils.hasProperty(obj, "age")).toBe(false);
        });
        it("should return false for null or undefined object", () => {
            expect(ObjectUtils.hasProperty(null, "name")).toBe(false);
            expect(ObjectUtils.hasProperty(undefined, "name")).toBe(false);
        });
        it("should return false for non-object values", () => {
            expect(ObjectUtils.hasProperty("string", "length")).toBe(false);
            expect(ObjectUtils.hasProperty(123, "toString")).toBe(false);
            expect(ObjectUtils.hasProperty(true, "valueOf")).toBe(false);
        });
        it("should return false for empty property name", () => {
            const obj = {name: "John"};

            expect(ObjectUtils.hasProperty(obj, "")).toBe(false);
        });
    });
    describe("isEmpty", () => {
        it("should return true for empty object", () => {
            expect(ObjectUtils.isEmpty({})).toBe(true);
        });
        it("should return false for non-empty object", () => {
            const obj = {name: "John"};

            expect(ObjectUtils.isEmpty(obj)).toBe(false);
        });
        it("should return false for an object with only symbol properties", () => {
            const obj = {[Symbol("test")]: "value"};

            expect(ObjectUtils.isEmpty(obj)).toBe(false);
        });
        it("should return false for non-object values", () => {
            expect(ObjectUtils.isEmpty(null)).toBe(false);
            expect(ObjectUtils.isEmpty(undefined)).toBe(false);
            expect(ObjectUtils.isEmpty("string")).toBe(false);
            expect(ObjectUtils.isEmpty(123)).toBe(false);
            expect(ObjectUtils.isEmpty(true)).toBe(false);
            expect(ObjectUtils.isEmpty([])).toBe(false);
        });
    });
    describe("isObject", () => {
        it("should return true for plain objects", () => {
            expect(ObjectUtils.isObject({})).toBe(true);
            expect(ObjectUtils.isObject({name: "John"})).toBe(true);
        });
        it("should return false for null or undefined", () => {
            expect(ObjectUtils.isObject(null)).toBe(false);
            expect(ObjectUtils.isObject(undefined)).toBe(false);
        });
        it("should return false for arrays", () => {
            expect(ObjectUtils.isObject([])).toBe(false);
        });
        it("should return false for primitive values", () => {
            expect(ObjectUtils.isObject("")).toBe(false);
            expect(ObjectUtils.isObject("string")).toBe(false);
            expect(ObjectUtils.isObject(123)).toBe(false);
            expect(ObjectUtils.isObject(true)).toBe(false);
        });
        it("should return false for functions", () => {
            expect(ObjectUtils.isObject(() => {})).toBe(false);
        });
    });
});
