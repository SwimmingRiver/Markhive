"use client";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/types/database.types";

type Bookmark = Tables<"bookmarks">;

export const useGetBookmarksQuery = () => {
  return useQuery<Bookmark[]>({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const response = await fetch("/api/bookmarks");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    },
  });
};
