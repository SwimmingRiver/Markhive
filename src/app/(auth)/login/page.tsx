"use client";

import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/auth/auth-card";
import { useSigninMutation } from "@/hooks/auth/useSigninMutation";
import { signInWithGoogle } from "@/lib/auth/actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState(false);
  const { mutate: signin, isPending } = useSigninMutation();
  const router = useRouter();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    if (!email || !password) {
      setError(true);
    } else {
      setError(false);
      signin(
        { email, password },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: (error) => {
            console.error(error);
            setError(true);
          },
        },
      );
    }
  }

  return (
    <AuthCard>
      <h2 className="text-[17px] font-medium mb-1">다시 오셨군요</h2>
      <p className="text-[12px] mb-6 text-muted">
        계정에 로그인해서 읽기 목록을 확인하세요
      </p>

      {/* Google */}
      <form action={signInWithGoogle}>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-[9px] rounded-[9px] px-4 py-[11px] text-[13px] font-medium border border-border [border-width:0.5px] mb-[18px] hover:opacity-80 transition-opacity bg-overlay text-foreground"
        >
          <span className="w-[18px] h-[18px] bg-white rounded-full flex items-center justify-center text-[11px] font-bold text-[#4285F4] shrink-0">
            G
          </span>
          Google로 계속하기
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-[10px] mb-[18px]">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[11px] text-subtle">또는 이메일로</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-[13px]">
          <label className="block text-[11px] font-medium mb-[6px] tracking-wide text-muted">
            이메일
          </label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-[8px] px-3 py-[9px] text-[13px] border border-border [border-width:0.5px] outline-none bg-overlay text-foreground focus:border-border-focus transition-colors"
          />
        </div>

        <div className="mb-[6px]">
          <label className="block text-[11px] font-medium mb-[6px] tracking-wide text-muted">
            비밀번호
          </label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-[8px] px-3 py-[9px] text-[13px] border border-border [border-width:0.5px] outline-none bg-overlay text-foreground focus:border-border-focus transition-colors"
          />
        </div>

        <div className="flex justify-end mb-[13px]">
          <span className="text-[11px] cursor-pointer text-primary-light">
            비밀번호 찾기
          </span>
        </div>

        {error && (
          <div className="text-[11px] rounded-[6px] px-[10px] py-[7px] mb-3 text-error bg-error-bg">
            이메일 또는 비밀번호가 올바르지 않아요.
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-[9px] py-[11px] text-[13px] font-medium text-white mb-4 transition-opacity hover:opacity-85 bg-primary"
          disabled={isPending}
        >
          {isPending ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <p className="text-center text-[12px] text-subtle">
        아직 계정이 없으신가요?{" "}
        <Link href="/signup" className="hover:underline text-primary-light">
          회원가입
        </Link>
      </p>
    </AuthCard>
  );
}
