import { Tables } from "@/types/database.types";

export type StatusFilter = "all" | "unread" | "read";

export type Bookmark = Tables<"bookmarks"> & {
  bookmark_tags: { tags: { name: string } | null }[];
};
