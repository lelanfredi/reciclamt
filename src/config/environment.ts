/**
 * Centralização de variáveis de ambiente.
 * Todas as env vars do projeto devem ser acessadas por aqui.
 */

export const env = {
  // Supabase
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL as string | undefined,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined,

  // Google Maps
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined,

  // Botpress
  botpressBotId: import.meta.env.VITE_BOTPRESS_BOT_ID as string | undefined,
  botpressClientId: import.meta.env.VITE_BOTPRESS_CLIENT_ID as string | undefined,

  // App
  isDev: import.meta.env.DEV,
} as const;
