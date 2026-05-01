"use client";

import { StatusFilter } from "./types";

interface FilterBarProps {
  status: StatusFilter;
  activeTag: string | null;
  allTags: string[];
  count: number;
  onStatusChange: (status: StatusFilter) => void;
  onTagChange: (tag: string | null) => void;
}

export default function FilterBar({
  status,
  activeTag,
  allTags,
  count,
  onStatusChange,
  onTagChange,
}: FilterBarProps) {
  return (
    <div className="flex items-center gap-4 flex-wrap mb-6">
      {/* Status tabs */}
      <div className="flex gap-0.5 p-1 bg-surface border border-border rounded-lg">
        {(["all", "unread", "read"] as StatusFilter[]).map((s) => (
          <button
            key={s}
            onClick={() => onStatusChange(s)}
            className={`px-3.5 py-1 rounded-md text-[12px] font-medium transition-colors ${
              status === s
                ? "bg-overlay text-foreground"
                : "text-subtle hover:text-muted"
            }`}
          >
            {s === "all" ? "전체" : s === "unread" ? "안읽음" : "읽음"}
          </button>
        ))}
      </div>

      {/* Tag pills */}
      {allTags.length > 0 && (
        <>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2 flex-wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagChange(activeTag === tag ? null : tag)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                  activeTag === tag
                    ? "bg-primary-soft border-border-focus text-primary-light"
                    : "border-border text-subtle hover:border-white/10 hover:text-muted"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                {tag}
              </button>
            ))}
          </div>
        </>
      )}

      <span className="ml-auto text-[11px] text-subtle">{count}개</span>
    </div>
  );
}
