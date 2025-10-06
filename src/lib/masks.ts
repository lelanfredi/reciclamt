// Utilitários para máscaras de input

/**
 * Aplica máscara de telefone brasileiro
 * @param value - Valor do input
 * @returns Valor com máscara aplicada
 */
export function applyPhoneMask(value: string): string {
  // Remove todos os caracteres não numéricos
  const numbers = value.replace(/\D/g, '');
  
  // Aplica a máscara baseada no tamanho
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  } else {
    // Para números com 11 dígitos (celular com 9)
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }
}

/**
 * Remove máscara do telefone, retornando apenas números
 * @param value - Valor com máscara
 * @returns Apenas números
 */
export function removePhoneMask(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Valida se o telefone tem formato válido
 * @param phone - Número de telefone
 * @returns true se válido
 */
export function isValidPhone(phone: string): boolean {
  const numbers = removePhoneMask(phone);
  return numbers.length >= 10 && numbers.length <= 11;
}

/**
 * Formata telefone para exibição
 * @param phone - Número de telefone
 * @returns Telefone formatado
 */
export function formatPhoneDisplay(phone: string): string {
  if (!phone) return '';
  return applyPhoneMask(phone);
}
