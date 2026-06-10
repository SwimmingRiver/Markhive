"use client";

import createClient from "@/lib/supabase/client";
import { useMutation } from "@tanstack/react-query";

export const useGoogleSigninMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw new Error(error.message);
    },
  });
};
