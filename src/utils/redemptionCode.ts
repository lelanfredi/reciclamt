/**
 * Gera um código de resgate único e robusto.
 * Formato: REC-XXXXXX (6 caracteres alfanuméricos aleatórios)
 */
export function generateRedemptionCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sem 0/O/1/I para evitar confusão
  let code = "";
  const array = new Uint8Array(6);
  crypto.getRandomValues(array);
  for (const byte of array) {
    code += chars[byte % chars.length];
  }
  return `REC-${code}`;
}
