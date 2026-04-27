"use client";
import { useMutation } from "@tanstack/react-query";

export const usePostBookmarkMutation = () => {
  return useMutation({
    mutationFn: async (url: string) => {
      const response = await fetch("/api/bookmarks", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    },
  });
};
