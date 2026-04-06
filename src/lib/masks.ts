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
 * Normaliza telefone para formato padrão de armazenamento
 * Garante que o telefone seja salvo com código do país (55) + DDD + número
 * Isso permite matching direto com o formato do WhatsApp (5512996811965)
 * @param phone - Número de telefone (apenas dígitos)
 * @returns Telefone normalizado com código do país
 */
export function normalizePhoneForStorage(phone: string): string {
  const digits = phone.replace(/\D/g, '');

  // Se já tem 13 dígitos (55 + DDD + 9 dígitos), retorna como está
  if (digits.length === 13 && digits.startsWith('55')) {
    return digits;
  }

  // Se tem 12 dígitos (55 + DDD + 8 dígitos), retorna como está
  if (digits.length === 12 && digits.startsWith('55')) {
    return digits;
  }

  // Se tem 11 dígitos (DDD + 9 dígitos celular), adiciona 55
  if (digits.length === 11) {
    return '55' + digits;
  }

  // Se tem 10 dígitos (DDD + 8 dígitos fixo), adiciona 55
  if (digits.length === 10) {
    return '55' + digits;
  }

  // Caso não se encaixe, retorna como está
  return digits;
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
