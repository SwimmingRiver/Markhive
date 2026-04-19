"use client";

import { signIn } from "@/lib/auth/actions";
import { useMutation } from "@tanstack/react-query";

export const useSigninMutation = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const result = await signIn(email, password);
      if (!result.success) throw new Error(result.error);
      return result;
    },
  });
};
