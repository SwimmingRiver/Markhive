"use client";

import { BookmarkIcon, FolderIcon, HomeIcon, SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const MENU_ITEMS = [
  { href: "/", icon: HomeIcon, label: "홈" },
  { href: "/library", icon: FolderIcon, label: "라이브러리" },
  { href: "/bookmark", icon: BookmarkIcon, label: "북마크" },
  { href: "/search", icon: SearchIcon, label: "검색" },
];

export default function SNB() {
  const pathname = usePathname();
  return (
    <div className="w-56 h-full border-r border-border bg-surface">
      <div className="px-2 py-3">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-4 py-3 rounded-md text-[13px] transition-colors ${
              pathname === item.href
                ? "bg-primary-soft text-primary-light"
                : "text-muted hover:text-foreground hover:bg-overlay"
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
