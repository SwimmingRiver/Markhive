"use client";
import { BookOpenIcon, TagIcon, LibraryIcon } from "lucide-react";
import { useReadStatsQuery } from "@/hooks/bookmarks/useReadStatsQuery";

export default function StatsCards() {
  const { data: stats } = useReadStatsQuery();

  const items = [
    { icon: LibraryIcon, label: "총 저장", value: stats?.total ?? "—" },
    { icon: BookOpenIcon, label: "읽음", value: stats?.readCount ?? "—" },
    { icon: TagIcon, label: "태그", value: stats?.tagCount ?? "—" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="bg-overlay border border-border rounded-xl px-5 py-4 flex flex-col gap-2"
        >
          <div className="flex items-center gap-2 text-subtle">
            <Icon className="w-3.5 h-3.5" />
            <span className="text-[11px] font-semibold tracking-widest uppercase">
              {label}
            </span>
          </div>
          <span className="font-serif text-[28px] leading-none text-foreground">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
