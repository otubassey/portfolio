import StringUtils from "./stringUtils";

describe("StringUtils", () => {
    describe("capitalize", () => {
        it("should capitalize the first letter of a string", () => {
            expect(StringUtils.capitalize("hello")).toBe("Hello");
            expect(StringUtils.capitalize("WOrlD")).toBe("World");
        });
        it("should handle single-character strings", () => {
            expect(StringUtils.capitalize("a")).toBe("A");
            expect(StringUtils.capitalize("b")).toBe("B");
        });
        it("should handle empty strings", () => {
            expect(StringUtils.capitalize("")).toBe("");
        });
        it("should handle null or undefined input", () => {
            expect(StringUtils.capitalize(null)).toBe("");
            expect(StringUtils.capitalize(undefined)).toBe("");
        });
        it("should correctly capitalize with locale when localize is true", () => {
            expect(StringUtils.capitalize("test", true)).toBe("Test");
            expect(StringUtils.capitalize("ô", true)).toBe("Ô");
        });
        it("should correctly capitalize without locale when localize is false or undefined", () => {
            expect(StringUtils.capitalize("i")).toBe("I");
            expect(StringUtils.capitalize("i", false)).toBe("I");
        });
    });
    describe("includesIgnoreCase", () => {
        it("should return true if the text includes the search text (case-insensitive)", () => {
            expect(StringUtils.includesIgnoreCase("Hello World", "hello")).toBe(true);
            expect(StringUtils.includesIgnoreCase("Hello World", "WORLD")).toBe(true);
        });
        it("should return false if the text does not include the search text", () => {
            expect(StringUtils.includesIgnoreCase("Hello World", "foo")).toBe(false);
        });
        it("should handle null or undefined input", () => {
            expect(StringUtils.includesIgnoreCase(null, "foo")).toBe(false);
            expect(StringUtils.includesIgnoreCase("hello", null)).toBe(false);
            expect(StringUtils.includesIgnoreCase(undefined, "hello")).toBe(false);
            expect(StringUtils.includesIgnoreCase("hello", undefined)).toBe(false);
            expect(StringUtils.includesIgnoreCase(null, null)).toBe(false);
            expect(StringUtils.includesIgnoreCase(undefined, undefined)).toBe(false);
        });
        it("should handle different locales when localize is true", () => {
            const text = "Test";
            const searchText = "test";

            expect(StringUtils.includesIgnoreCase(text, searchText)).toBe(true);
            expect(StringUtils.includesIgnoreCase("hellô", "ô")).toBe(true);
        });
        it("should handle different locales when localize is false or undefined", () => {
            const text = "Test";
            const searchText = "test";

            expect(StringUtils.includesIgnoreCase(text, searchText)).toBe(true);
            expect(StringUtils.includesIgnoreCase(text, searchText, false)).toBe(true);
        });
    });
    describe("toLowerCase", () => {
        it("should convert a string to lowercase", () => {
            expect(StringUtils.toLowerCase("Hello")).toBe("hello");
            expect(StringUtils.toLowerCase("WoRlD")).toBe("world");
        });
        it("should handle empty strings", () => {
            expect(StringUtils.toLowerCase("")).toBe("");
        });
        it("should handle null or undefined input", () => {
            expect(StringUtils.toLowerCase(null)).toBe("");
            expect(StringUtils.toLowerCase(undefined)).toBe("");
        });
        it("should correctly convert to lowercase with locale when localize is true", () => {
            expect(StringUtils.toLowerCase("TEST", true)).toBe("test");
            expect(StringUtils.toLowerCase("Î", true)).toBe("î");
        });
        it("should correctly convert to lowercase without locale when localize is false or undefined", () => {
            expect(StringUtils.toLowerCase("TEST")).toBe("test");
            expect(StringUtils.toLowerCase("TEST", false)).toBe("test");
        });
    });
    describe("toUpperCase", () => {
        it("should convert a string to uppercase", () => {
            expect(StringUtils.toUpperCase("hello")).toBe("HELLO");
            expect(StringUtils.toUpperCase("woRlD", false)).toBe("WORLD");
        }); 
        it("should handle empty strings", () => {
            expect(StringUtils.toUpperCase("")).toBe("");
        }); 
        it("should handle null or undefined input", () => {
            expect(StringUtils.toUpperCase(null)).toBe("");
            expect(StringUtils.toUpperCase(undefined)).toBe("");
        }); 
        it("should correctly convert to uppercase with locale when localize is true", () => {
            expect(StringUtils.toUpperCase("test", true)).toBe("TEST");
            expect(StringUtils.toUpperCase("î", true)).toBe("Î");
        }); 
        it("should correctly convert to uppercase without locale when localize is false or undefined", () => {
            expect(StringUtils.toUpperCase("test")).toBe("TEST");
            expect(StringUtils.toUpperCase("test", false)).toBe("TEST");
        }); 
    });
});
