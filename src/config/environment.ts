export const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL as string | undefined,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined,
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined,
  botpressBotId: import.meta.env.VITE_BOTPRESS_BOT_ID as string | undefined,
  botpressClientId: import.meta.env.VITE_BOTPRESS_CLIENT_ID as string | undefined,
  isDev: import.meta.env.DEV,
} as const;
