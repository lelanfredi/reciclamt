export const MATERIAL_TYPES = ["Plástico", "Papel", "Vidro", "Metal", "Eletrônicos"] as const;

export type MaterialType = (typeof MATERIAL_TYPES)[number];

export const POINTS_PER_KG: Record<MaterialType, number> = {
  Plástico: 10,
  Papel: 8,
  Vidro: 12,
  Metal: 15,
  Eletrônicos: 25,
};

export const DEFAULT_POINTS_PER_KG = 10;

export const LEVEL_THRESHOLD = 1000;

export const CO2_CONVERSION_FACTOR = 0.5;

export const ADMIN_EMAILS = [
  "reciclamt.projeto@gmail.com",
  "admin@reciclamt.com",
  "admin@example.com",
  "leticialanfredi@gmail.com",
];

export const DEFAULT_AVATAR = "floresta-feliz";

export const LINKS = {
  ebook:
    "https://drive.google.com/file/d/178mw3jgLN9C-857Bh7F-MGyGScBM0Irx/view?usp=sharing",
  termosDeUso:
    "https://drive.google.com/file/d/1Ya-8nYyzrl7kF918RooZd2bpG5kLfKhi/view?usp=sharing",
  politicaPrivacidade:
    "https://drive.google.com/file/d/1E_0uqJIOGlvYWSezL8XwsHlsYVGLpPJP/view?usp=sharing",
} as const;

export const CNPJ = "49.696.754.0001-17";

export const ODS_FALLBACK_URLS = {
  ods11: "https://brasil.un.org/sites/default/files/2020-09/agenda2030-pt-br.pdf",
  ods12: "https://brasil.un.org/sites/default/files/2020-09/agenda2030-pt-br.pdf",
} as const;
