"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateBookmarkMutation = () => {
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["recommendation"] });
    },
  });
};
