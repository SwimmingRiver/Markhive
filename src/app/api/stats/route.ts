import { NextRequest, NextResponse } from "next/server";
import { getSupabaseWithUser } from "@/lib/supabase/api";

export const GET = async (req: NextRequest) => {
  const { supabase, user } = await getSupabaseWithUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [bookmarksResult, tagsResult] = await Promise.all([
    supabase
      .from("bookmarks")
      .select("is_read")
      .eq("user_id", user.id),
    supabase
      .from("tags")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id),
  ]);

  if (bookmarksResult.error) {
    return NextResponse.json({ error: bookmarksResult.error.message }, { status: 500 });
  }

  const total = bookmarksResult.data.length;
  const readCount = bookmarksResult.data.filter((b) => b.is_read).length;
  const tagCount = tagsResult.count ?? 0;

  return NextResponse.json({ total, readCount, tagCount });
};
