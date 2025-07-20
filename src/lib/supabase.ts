import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

// Note: For production, these should be environment variables
// Currently hardcoded to resolve the missing env vars error
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://jlskevohwhugeefdfdxz.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsc2tldm9od2h1Z2VlZmRmZHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MjU3MDEsImV4cCI6MjA2NzQwMTcwMX0.tnWxrrtsXtGu5OZ2jrSNGkxhpseQaPW3b4aj1A9khJg";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
