"use client";
import SignoutButton from "./signout-button";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

interface HeaderProps {
  email: string;
  onToggle: () => void;
}

export default function Header({ email, onToggle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 h-14 border-b border-border [border-bottom-width:0.5px]">
      <div className="flex items-center gap-3">
        <button onClick={onToggle} className="p-1 rounded hover:bg-surface">
          <MenuIcon className="w-4 h-4" />
        </button>
        <Link href="/" className="font-serif text-lg">
          Markhive
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[12px] text-muted">{email}</span>
        <SignoutButton />
      </div>
    </header>
  );
}
