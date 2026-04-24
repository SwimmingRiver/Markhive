"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandPanel from "./brand-panel";

export default function AuthCard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="w-full max-w-[820px] rounded-2xl overflow-hidden flex flex-col bg-surface border border-border [border-width:0.5px]">
      {/* Topbar */}
      <div className="flex items-center justify-between px-6 h-[52px] border-b border-b-border [border-bottom-width:0.5px]">
        <div className="flex items-center gap-[7px] font-serif text-[20px]">
          <div className="w-[7px] h-[7px] rounded-full bg-primary" />
          Markhive
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-6 border-b border-b-border [border-bottom-width:0.5px]">
        {[
          { label: "로그인", href: "/login" },
          { label: "회원가입", href: "/signup" },
        ].map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-[10px] text-[13px] font-medium border-b-2 -mb-px transition-colors ${
              pathname === tab.href
                ? "text-primary-light border-b-primary"
                : "text-subtle border-transparent"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Body */}
      <div className="flex min-h-[480px]">
        <BrandPanel />
        <div className="flex-1 flex flex-col justify-center px-8 py-9">
          {children}
        </div>
      </div>
    </div>
  );
}
