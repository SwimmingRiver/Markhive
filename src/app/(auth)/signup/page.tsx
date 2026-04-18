"use client";

import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/auth/auth-card";

function getStrength(v: string): { level: number; label: string; color: string } {
  if (!v) return { level: 0, label: "", color: "" };
  if (v.length < 6) return { level: 1, label: "약함", color: "#F87171" };
  if (v.length < 10) return { level: 2, label: "보통", color: "#FBBF24" };
  return { level: 3, label: "강함", color: "#34D399" };
}

export default function SignupPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  const strength = getStrength(password);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    if (!email || password.length < 8) {
      setError(true);
      return;
    }
    setError(false);
    setDone(true);
  }

  if (done) {
    return (
      <AuthCard>
        <div className="flex flex-col items-center justify-center text-center py-6">
          <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-[24px] mb-4 border border-[rgba(52,211,153,0.25)] bg-[rgba(52,211,153,0.12)]">
            ✓
          </div>
          <h3 className="text-[15px] font-medium mb-2">이메일을 확인해주세요</h3>
          <p className="text-[13px] leading-relaxed text-muted">
            입력하신 주소로 인증 링크를 보냈어요.<br />링크를 클릭하면 바로 시작할 수 있어요.
          </p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <h2 className="text-[17px] font-medium mb-1">시작해볼까요</h2>
      <p className="text-[12px] mb-6 text-muted">
        무료로 가입하고 북마크를 정리해보세요
      </p>

      {/* Google */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-[9px] rounded-[9px] px-4 py-[11px] text-[13px] font-medium border border-border [border-width:0.5px] mb-[18px] hover:opacity-80 transition-opacity bg-overlay text-foreground"
      >
        <span className="w-[18px] h-[18px] bg-white rounded-full flex items-center justify-center text-[11px] font-bold text-[#4285F4] shrink-0">G</span>
        Google로 계속하기
      </button>

      {/* Divider */}
      <div className="flex items-center gap-[10px] mb-[18px]">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[11px] text-subtle">또는 이메일로</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-[13px]">
          <label className="block text-[11px] font-medium mb-[6px] tracking-wide text-muted">이메일</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-[8px] px-3 py-[9px] text-[13px] border border-border [border-width:0.5px] outline-none bg-overlay text-foreground focus:border-border-focus transition-colors"
          />
        </div>

        <div className="mb-[13px]">
          <label className="block text-[11px] font-medium mb-[6px] tracking-wide text-muted">비밀번호</label>
          <input
            name="password"
            type="password"
            placeholder="8자 이상"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-[8px] px-3 py-[9px] text-[13px] border border-border [border-width:0.5px] outline-none bg-overlay text-foreground focus:border-border-focus transition-colors"
          />
          {password && (
            <div className="mt-[6px]">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex-1 h-[2px] rounded-sm transition-colors duration-300"
                    style={{ background: i <= strength.level ? strength.color : "var(--color-overlay)" }}
                  />
                ))}
              </div>
              <span className="text-[10px]" style={{ color: strength.color }}>{strength.label}</span>
            </div>
          )}
        </div>

        {error && (
          <div className="text-[11px] rounded-[6px] px-[10px] py-[7px] mb-3 text-error bg-error-bg">
            이메일과 8자 이상 비밀번호를 입력해주세요.
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-[9px] py-[11px] text-[13px] font-medium text-white mb-4 transition-opacity hover:opacity-85 bg-primary"
        >
          회원가입
        </button>
      </form>

      <p className="text-center text-[12px] text-subtle">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="hover:underline text-primary-light">
          로그인
        </Link>
      </p>
    </AuthCard>
  );
}
