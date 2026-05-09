"use client";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/types/database.types";

type Bookmark = Tables<"bookmarks"> & {
  bookmark_tags: { tags: { name: string } | null }[];
};

type UseReadBookmarksQueryProps = {
  limit?: number;
  search_query?: string;
};
export const useReadBookmarksQuery = ({
  limit,
  search_query,
}: UseReadBookmarksQueryProps) => {
  return useQuery<Bookmark[]>({
    queryKey: ["bookmarks", limit, search_query],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (limit) params.set("limit", String(limit));
      if (search_query) params.set("search_query", search_query);
      const qs = params.size ? `?${params}` : "";
      const response = await fetch(`/api/bookmarks${qs}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    },
  });
};
