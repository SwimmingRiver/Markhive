"use client";

import { signOut } from "@/lib/auth/actions";
import { useMutation } from "@tanstack/react-query";

export const useSignoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const result = await signOut();
      if (!result.success) throw new Error(result.error);
      return result;
    },
  });
};
