"use client";

import {
  BookmarkIcon,
  FolderIcon,
  HistoryIcon,
  HomeIcon,
  SearchIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const MENU_ITEMS = [
  { href: "/", icon: HomeIcon, label: "홈" },
  { href: "/bookmark", icon: BookmarkIcon, label: "북마크" },
  { href: "/search", icon: SearchIcon, label: "검색" },
];

const LIBRARY_ITEMS = [
  { href: "/library", icon: FolderIcon, label: "전체" },
  { href: "/library/unread", icon: HistoryIcon, label: "안읽음" },
];

const getItemsStyle = (pathname: string, href: string) => {
  return `flex items-center gap-2 px-4 py-3 ${pathname === href ? "bg-primary-soft" : ""}`;
};

export default function SNB() {
  const pathname = usePathname();
  return (
    <div className="w-56 h-full border-r border-border bg-surface">
      <div className="px-2 py-3">
        <span className="text-[12px] text-muted">메뉴</span>

        {MENU_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={getItemsStyle(pathname, item.href)}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
      </div>
      <div className="px-2 py-3">
        <span className="text-[12px] text-muted">라이브러리</span>
        {LIBRARY_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={getItemsStyle(pathname, item.href)}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
