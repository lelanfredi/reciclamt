import { describe, it, expect } from "vitest";
import { generateRedemptionCode } from "../utils/redemptionCode";

describe("generateRedemptionCode", () => {
  it("should generate a code starting with REC-", () => {
    const code = generateRedemptionCode();
    expect(code).toMatch(/^REC-/);
  });

  it("should generate a 10-character code (REC- + 6 chars)", () => {
    const code = generateRedemptionCode();
    expect(code).toHaveLength(10);
  });

  it("should only contain valid characters (no confusing 0, O, 1, I)", () => {
    // Generate multiple codes to increase coverage
    for (let i = 0; i < 50; i++) {
      const code = generateRedemptionCode();
      const suffix = code.slice(4); // Remove "REC-"
      expect(suffix).not.toMatch(/[0O1I]/);
      expect(suffix).toMatch(/^[A-HJ-NP-Z2-9]+$/);
    }
  });

  it("should generate unique codes", () => {
    const codes = new Set<string>();
    for (let i = 0; i < 100; i++) {
      codes.add(generateRedemptionCode());
    }
    // With 100 codes from a large character space, all should be unique
    expect(codes.size).toBe(100);
  });
});
