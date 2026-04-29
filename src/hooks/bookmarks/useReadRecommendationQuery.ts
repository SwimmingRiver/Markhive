"use client";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/types/database.types";

export type RecommendationBookmark = Tables<"bookmarks"> & {
  bookmark_tags: { tags: { name: string } | null }[];
};

export const useReadRecommendationQuery = () => {
  return useQuery<RecommendationBookmark | null>({
    queryKey: ["recommendation"],
    queryFn: async () => {
      const response = await fetch("/api/bookmarks/recommendation");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    },
  });
};
