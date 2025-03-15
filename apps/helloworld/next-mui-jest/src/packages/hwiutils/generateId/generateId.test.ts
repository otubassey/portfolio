import generateId from "./generateId";

describe("generateId", () => {
    it("should generate a valid UUID v4 string without a prefix", () => {
        const identifier = generateId();
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
        
        expect(identifier).toMatch(uuidRegex);
    });
    it("should generate a valid UUID v4 string with a prefix", () => {
        const prefix = "test";
        const identifier = generateId(prefix);
        const prefixedUuidRegex = new RegExp(`^${prefix}-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$`);
        
        expect(identifier).toMatch(prefixedUuidRegex);
    });
    it("should generate different UUIDs for subsequent calls with the same prefix", () => {
        const prefix = "same";
        const identifier1 = generateId(prefix);
        const identifier2 = generateId(prefix);

        expect(identifier1).not.toBe(identifier2);
    });
    it("should generate different UUIDs for subsequent calls without a prefix", () => {
        const identifier1 = generateId();
        const identifier2 = generateId();

        expect(identifier1).not.toBe(identifier2);
    });
});
