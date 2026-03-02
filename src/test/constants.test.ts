import { describe, it, expect } from "vitest";
import {
  MATERIAL_TYPES,
  POINTS_PER_KG,
  DEFAULT_POINTS_PER_KG,
  EWASTE_POINTS_PER_ITEM,
  EWASTE_DEFAULT_CAMPAIGN,
  ADMIN_EMAILS,
  DEFAULT_AVATAR,
  LEVEL_THRESHOLD,
  CO2_CONVERSION_FACTOR,
  LINKS,
  CNPJ,
  ODS_FALLBACK_URLS,
} from "../config/constants";

describe("constants", () => {
  describe("MATERIAL_TYPES", () => {
    it("should contain all 5 material types", () => {
      expect(MATERIAL_TYPES).toHaveLength(5);
      expect(MATERIAL_TYPES).toContain("Plástico");
      expect(MATERIAL_TYPES).toContain("Papel");
      expect(MATERIAL_TYPES).toContain("Vidro");
      expect(MATERIAL_TYPES).toContain("Metal");
      expect(MATERIAL_TYPES).toContain("Eletrônicos");
    });
  });

  describe("POINTS_PER_KG", () => {
    it("should have points defined for each material type", () => {
      for (const material of MATERIAL_TYPES) {
        expect(POINTS_PER_KG[material]).toBeGreaterThan(0);
      }
    });

    it("should give Eletrônicos the highest points per kg", () => {
      const maxPoints = Math.max(...Object.values(POINTS_PER_KG));
      expect(POINTS_PER_KG["Eletrônicos"]).toBe(maxPoints);
    });
  });

  describe("EWASTE config", () => {
    it("should have positive points per item", () => {
      expect(EWASTE_POINTS_PER_ITEM).toBeGreaterThan(0);
    });

    it("should have a campaign identifier", () => {
      expect(EWASTE_DEFAULT_CAMPAIGN).toBeTruthy();
      expect(EWASTE_DEFAULT_CAMPAIGN).toContain("eletronicos");
    });
  });

  describe("ADMIN_EMAILS", () => {
    it("should include the project email", () => {
      expect(ADMIN_EMAILS).toContain("reciclamt.projeto@gmail.com");
    });

    it("should use .com.br domain", () => {
      const brEmails = ADMIN_EMAILS.filter((e) => e.endsWith(".com.br"));
      expect(brEmails.length).toBeGreaterThan(0);
    });

    it("should not contain empty strings", () => {
      ADMIN_EMAILS.forEach((email) => {
        expect(email.length).toBeGreaterThan(0);
        expect(email).toContain("@");
      });
    });
  });

  describe("DEFAULT_AVATAR", () => {
    it("should be floresta-feliz (not felix)", () => {
      expect(DEFAULT_AVATAR).toBe("floresta-feliz");
      expect(DEFAULT_AVATAR).not.toBe("felix");
    });
  });

  describe("Gamification", () => {
    it("should have positive level threshold", () => {
      expect(LEVEL_THRESHOLD).toBeGreaterThan(0);
    });

    it("should have valid CO2 conversion factor", () => {
      expect(CO2_CONVERSION_FACTOR).toBeGreaterThan(0);
      expect(CO2_CONVERSION_FACTOR).toBeLessThanOrEqual(1);
    });
  });

  describe("Links", () => {
    it("should have valid Google Drive URLs", () => {
      Object.values(LINKS).forEach((url) => {
        expect(url).toMatch(/^https:\/\/drive\.google\.com/);
      });
    });
  });

  describe("CNPJ", () => {
    it("should be a valid CNPJ format", () => {
      expect(CNPJ).toMatch(/^\d{2}\.\d{3}\.\d{3}\.\d{4}-\d{2}$/);
    });
  });

  describe("ODS_FALLBACK_URLS", () => {
    it("should have URLs for ODS 11 and 12", () => {
      expect(ODS_FALLBACK_URLS.ods11).toContain("SDG-11");
      expect(ODS_FALLBACK_URLS.ods12).toContain("SDG-12");
    });
  });
});
