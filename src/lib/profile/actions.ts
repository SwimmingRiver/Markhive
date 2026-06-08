"use server";

import { z } from "zod";
import createClient from "@/lib/supabase/server";

const updateProfileSchema = z.object({
  display_name: z.string().min(1, "이름을 입력해주세요").max(50),
  bio: z.string().max(200).optional(),
});

export async function updateProfile(_prev: unknown, formData: FormData) {
  const parsed = updateProfileSchema.safeParse({
    display_name: formData.get("display_name"),
    bio: formData.get("bio") || undefined,
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    data: {
      display_name: parsed.data.display_name,
      bio: parsed.data.bio ?? null,
    },
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}
