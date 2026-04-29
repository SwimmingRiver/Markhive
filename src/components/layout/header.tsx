"use client";
import SignoutButton from "./SignoutButton";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import QuickSave from "./QuickSave";

interface HeaderProps {
  email: string;
  onToggle: () => void;
}

export default function Header({ email, onToggle }: HeaderProps) {
  return (
    <header className="flex items-center px-4 sm:px-6 h-14 border-b border-border [border-bottom-width:0.5px]">
      <div className="flex-1 flex items-center gap-2 sm:gap-3">
        <button onClick={onToggle} className="p-1 rounded hover:bg-surface">
          <MenuIcon className="w-4 h-4" />
        </button>
        <Link href="/" className="hidden sm:block font-serif text-lg">
          Markhive
        </Link>
      </div>
      <QuickSave />
      <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4">
        <span className="hidden sm:block text-[12px] text-muted">{email}</span>
        <SignoutButton />
      </div>
    </header>
  );
}
