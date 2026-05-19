"use client";

import { signUp } from "@/lib/auth/actions";
import { useMutation } from "@tanstack/react-query";

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
      displayName,
    }: {
      email: string;
      password: string;
      displayName: string;
    }) => {
      const result = await signUp(email, password, displayName);

      if (!result.success) throw new Error(result.error);
      return result;
    },
  });
};
