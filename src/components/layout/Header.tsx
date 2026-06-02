"use client";
import Link from "next/link";
import { MenuIcon, ChevronDownIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSignoutMutation } from "@/hooks/auth/useSignoutMutation";
import { useRouter } from "next/navigation";

import QuickSave from "./QuickSave";

interface HeaderProps {
  email: string;
  onToggle: () => void;
}

function UserMenu({ displayName }: { displayName: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { mutate: signout, isPending } = useSignoutMutation();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-[12px] text-muted hover:text-foreground transition-colors"
      >
        <span>{displayName}</span>
        <ChevronDownIcon className="w-3 h-3" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 rounded-md border border-border bg-background shadow-md z-50 py-1">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-[12px] hover:bg-surface transition-colors"
          >
            개인 정보
          </Link>
          <button
            onClick={() =>
              signout(undefined, {
                onSuccess: () => router.push("/login"),
              })
            }
            disabled={isPending}
            className="w-full text-left px-4 py-2 text-[12px] hover:bg-surface transition-colors disabled:opacity-50"
          >
            {isPending ? "로그아웃 중..." : "로그아웃"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Header({ email, onToggle }: HeaderProps) {
  return (
    <header className="relative flex items-center px-4 sm:px-6 md:px-8 h-14 border-b border-border [border-bottom-width:0.5px]">
      <div className="flex items-center gap-2 sm:gap-3 z-10">
        <button onClick={onToggle} className="p-1 rounded hover:bg-surface">
          <MenuIcon className="w-4 h-4" />
        </button>
        <Link href="/" className="hidden sm:block font-serif text-lg">
          Markhive
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 min-w-0">
        <div className="w-full max-w-[760px]">
          <QuickSave />
        </div>
      </div>
      <div className="shrink-0 z-10">
        <UserMenu displayName={email} />
      </div>
    </header>
  );
}
