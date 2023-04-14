import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { env } from "y/env.mjs";

const supabaseUrl = "https://sprqqelvuqjbdmrmwgyd.supabase.co";
const supabaseKey = env.SUPABASE_KEY;

const globalForSupabase = globalThis as unknown as { supabase: SupabaseClient };

export const supabase =
  globalForSupabase.supabase || createClient(supabaseUrl, supabaseKey);

if (env.NODE_ENV !== "production") globalForSupabase.supabase = supabase;
