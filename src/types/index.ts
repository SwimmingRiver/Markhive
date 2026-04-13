import type { Database } from "@/types/database.types";

type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type Bookmark = Tables<"bookmarks">;
export type Tag = Tables<"tags">;
export type BookmarkTag = Tables<"bookmark_tags">;
