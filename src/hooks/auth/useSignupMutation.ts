"use client";

import { signUp } from "@/lib/auth/actions";
import { useMutation } from "@tanstack/react-query";

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const result = await signUp(email, password);
      if (!result.success) throw new Error(result.error);
      return result;
    },
  });
};
