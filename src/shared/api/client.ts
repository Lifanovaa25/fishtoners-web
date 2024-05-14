import { createClient } from "@supabase/supabase-js";

// import { Database } from "./database.types.ts";

export const client = createClient(__SUPABASE_URL__, __SUPABASE_ANON_KEY__);
