import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";
import { env } from "../config/environment";

const supabaseUrl = env.supabaseUrl;
const supabaseAnonKey = env.supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Copy .env.example to .env and fill in your values.",
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
