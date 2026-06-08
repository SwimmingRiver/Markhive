"use client";

import { BookOpenIcon, TagIcon, LibraryIcon } from "lucide-react";
import { useReadStatsQuery } from "@/hooks/bookmarks/useReadStatsQuery";

export default function ProfileStats() {
  const { data: stats } = useReadStatsQuery();

  const total = stats?.total ?? 0;
  const readCount = stats?.readCount ?? 0;
  const readRate = total > 0 ? Math.round((readCount / total) * 100) : 0;

  const items = [
    {
      icon: LibraryIcon,
      label: "총 저장",
      value: stats?.total ?? "—",
      sub: null,
    },
    {
      icon: BookOpenIcon,
      label: "읽음",
      value: stats?.readCount ?? "—",
      sub: `읽기율 ${readRate}%`,
    },
    {
      icon: TagIcon,
      label: "태그",
      value: stats?.tagCount ?? "—",
      sub: null,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map(({ icon: Icon, label, value, sub }) => (
        <div
          key={label}
          className="bg-surface border border-border rounded-xl px-5 py-4 flex flex-col gap-2"
        >
          <div className="flex items-center gap-2 text-subtle">
            <Icon className="w-3.5 h-3.5" />
            <span className="text-[11px] font-semibold tracking-widest uppercase">{label}</span>
          </div>
          <span className="font-serif text-[28px] leading-none text-foreground">{value}</span>
          {sub && <span className="text-[11px] text-primary-light">{sub}</span>}
        </div>
      ))}
    </div>
  );
}
