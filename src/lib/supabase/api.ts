import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import createClient from "@/lib/supabase/server";
import { Database } from "@/types/database.types";

export async function getSupabaseWithUser(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  const supabase = token
    ? createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          global: { headers: { Authorization: `Bearer ${token}` } },
          cookies: { getAll: () => [], setAll: () => {} },
        },
      )
    : await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, user };
}
