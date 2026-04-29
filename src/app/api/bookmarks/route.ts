import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import createClient from "@/lib/supabase/server";
import { parseMetadata } from "@/lib/metadata";
import { Database } from "@/types/database.types";
import { analyzeBookmark } from "@/lib/ai";

const schema = z.object({ url: z.string().url() });

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

export const GET = async (req: NextRequest) => {
  const { supabase, user } = await getSupabaseWithUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*, bookmark_tags(tags(name))")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const { supabase, user } = await getSupabaseWithUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const { title, description } = await parseMetadata(parsed.data.url);
  const { summary, tags } = await analyzeBookmark({
    url: parsed.data.url,
    title,
    description,
  });

  const { data: bookmark, error: bookmarkError } = await supabase
    .from("bookmarks")
    .insert({
      url: parsed.data.url,
      user_id: user.id,
      title,
      description,
      summary,
    })
    .select()
    .single();

  if (bookmarkError) {
    return NextResponse.json({ error: bookmarkError.message }, { status: 500 });
  }

  if (tags.length > 0) {
    const { data: tagRows, error: tagError } = await supabase
      .from("tags")
      .upsert(
        tags.map((name) => ({ name, user_id: user.id })),
        { onConflict: "user_id,name" },
      )
      .select();

    if (!tagError && tagRows) {
      await supabase
        .from("bookmark_tags")
        .insert(tagRows.map((tag) => ({ bookmark_id: bookmark.id, tag_id: tag.id })));
    }
  }

  return NextResponse.json(bookmark, { status: 201 });
};
