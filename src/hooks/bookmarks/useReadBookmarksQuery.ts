"use client";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/types/database.types";

type Bookmark = Tables<"bookmarks"> & {
  bookmark_tags: { tags: { name: string } | null }[];
};

type UseReadBookmarksQueryProps = {
  limit?: number;
};
export const useReadBookmarksQuery = ({
  limit,
}: UseReadBookmarksQueryProps) => {
  return useQuery<Bookmark[]>({
    queryKey: ["bookmarks", limit],
    queryFn: async () => {
      const response = await fetch(
        `/api/bookmarks${limit ? `?limit=${limit}` : ""}`,
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    },
  });
};
