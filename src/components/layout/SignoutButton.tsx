"use client";

import { useSignoutMutation } from "@/hooks/auth/useSignoutMutation";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const router = useRouter();
  const { mutate: signout, isPending } = useSignoutMutation();

  return (
    <button
      onClick={() =>
        signout(undefined, {
          onSuccess: () => router.push("/login"),
        })
      }
      disabled={isPending}
      className="text-[12px] text-muted hover:text-foreground transition-colors disabled:opacity-50"
    >
      {isPending ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
}
