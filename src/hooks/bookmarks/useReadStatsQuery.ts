"use client";
import { useQuery } from "@tanstack/react-query";

export type Stats = {
  total: number;
  readCount: number;
  tagCount: number;
};

export const useReadStatsQuery = () => {
  return useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await fetch("/api/stats");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    },
  });
};
