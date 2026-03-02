/**
 * Constantes centralizadas do ReciclaMT.
 * Fonte única de verdade para valores de negócio usados em múltiplos arquivos.
 */

// --- Materiais e pontuação ---

export const MATERIAL_TYPES = [
  "Plástico",
  "Papel",
  "Vidro",
  "Metal",
  "Eletrônicos",
] as const;

export type MaterialType = (typeof MATERIAL_TYPES)[number];

export const POINTS_PER_KG: Record<MaterialType, number> = {
  Plástico: 10,
  Papel: 8,
  Vidro: 12,
  Metal: 15,
  Eletrônicos: 25,
};

export const DEFAULT_POINTS_PER_KG = 10;

// --- Campanha E-waste ---

export const EWASTE_POINTS_PER_ITEM = 25; // pontos padrão por item eletrônico validado
export const EWASTE_DEFAULT_CAMPAIGN = "eletronicos-marco-2026";

// --- Gamificação ---

export const LEVEL_THRESHOLD = 1000;
export const CO2_CONVERSION_FACTOR = 0.5; // kg de CO2 economizado por kg reciclado

// --- Usuários ---

export const ADMIN_EMAILS = [
  "reciclamt.projeto@gmail.com",
  "admin@reciclamt.com.br",
  "admin@example.com",
];

export const DEFAULT_AVATAR = "floresta-feliz";

// --- Links institucionais ---

export const LINKS = {
  ebook:
    "https://drive.google.com/file/d/178mw3jgLN9C-857Bh7F-MGyGScBM0Irx/view?usp=sharing",
  termosDeUso:
    "https://drive.google.com/file/d/1Ya-8nYyzr17kF918RooZd2bpG5kLfKhi/view?usp=sharing",
  politicaPrivacidade:
    "https://drive.google.com/file/d/1E_0uqJIOGlvYWSezL8XwsHlsYVGLpPJP/view?usp=sharing",
} as const;

export const CNPJ = "49.696.754.0001-17";

// --- ODS ---

export const ODS_FALLBACK_URLS = {
  ods11:
    "https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-11.svg",
  ods12:
    "https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-12.svg",
} as const;
