import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";
import { env } from "../config/environment";

const supabaseUrl = env.supabaseUrl;
const supabaseAnonKey = env.supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. " +
    "Copy .env.example to .env and fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
