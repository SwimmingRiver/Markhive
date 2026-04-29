import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import createClient from "@/lib/supabase/server";
import { Database } from "@/types/database.types";
import { z } from "zod";

const schema = z.object({ is_read: z.boolean() });

async function getSupabaseWithUser(req: NextRequest) {
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

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { supabase, user } = await getSupabaseWithUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("bookmarks")
    .update({ is_read: parsed.data.is_read })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
};
