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
    <header className="relative flex items-center px-4 sm:px-6 md:px-8 h-14 border-b border-border [border-bottom-width:0.5px]">
      <div className="flex items-center gap-2 sm:gap-3 z-10">
        <button onClick={onToggle} className="p-1 rounded hover:bg-surface">
          <MenuIcon className="w-4 h-4" />
        </button>
        <Link href="/" className="hidden sm:block font-serif text-lg">
          Markhive
        </Link>
      </div>
      <div className="absolute inset-y-0 left-0 md:left-56 right-0 flex items-center justify-center">
        <div className="w-full max-w-[760px] mx-auto px-8 pointer-events-auto">
          <QuickSave />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-3 sm:gap-4 z-10">
        <span className="hidden sm:block text-[12px] text-muted">{email}</span>
        <SignoutButton />
      </div>
    </header>
  );
}
