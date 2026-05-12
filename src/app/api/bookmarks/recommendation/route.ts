import { NextRequest, NextResponse } from "next/server";
import { getSupabaseWithUser } from "@/lib/supabase/api";

export const GET = async (req: NextRequest) => {
  const { supabase, user } = await getSupabaseWithUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();

  const { data: recentBookmarks } = await supabase
    .from("bookmarks")
    .select("id, bookmark_tags(tags(name))")
    .eq("user_id", user.id)
    .gte("created_at", since);

  const tagFrequency: Record<string, number> = {};
  for (const bookmark of recentBookmarks ?? []) {
    for (const bt of bookmark.bookmark_tags) {
      const name = bt.tags?.name;
      if (name) tagFrequency[name] = (tagFrequency[name] ?? 0) + 1;
    }
  }

  const topTag = Object.entries(tagFrequency).sort((a, b) => b[1] - a[1])[0]?.[0];

  if (topTag) {
    const { data: taggedBookmark } = await supabase
      .from("bookmarks")
      .select("*, bookmark_tags!inner(tags!inner(name))")
      .eq("user_id", user.id)
      .eq("is_read", false)
      .eq("bookmark_tags.tags.name", topTag)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (taggedBookmark) {
      return NextResponse.json(taggedBookmark);
    }
  }

  const { data: fallback, error } = await supabase
    .from("bookmarks")
    .select("*, bookmark_tags(tags(name))")
    .eq("user_id", user.id)
    .eq("is_read", false)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(fallback);
};
