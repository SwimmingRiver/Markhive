"use client";

import Link from "next/link";
import { useGetBookmarksQuery } from "@/hooks/bookmarks/useGetBookmarksQuery";

export default function RecentBookmarks() {
  const { data: bookmarks, isLoading } = useGetBookmarksQuery();

  if (isLoading) {
    return (
      <div className="w-full max-w-[720px]">
        <div className="flex flex-col gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-[52px] bg-surface border border-border rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!bookmarks?.length) return null;

  const recent = bookmarks.slice(0, 5);

  return (
    <div className="w-full max-w-[720px]">
      <div className="flex items-center justify-between mb-3.5">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-subtle">
          최근 저장
        </span>
        <Link
          href="/library"
          className="text-xs text-primary-light opacity-70 hover:opacity-100 transition-opacity"
        >
          전체 보기 →
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {recent.map((bookmark) => (
          <div
            key={bookmark.id}
            className="flex items-center gap-3 px-4 py-3 bg-surface border border-border rounded-lg hover:border-border-focus transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-md bg-overlay border border-border flex items-center justify-center text-xs shrink-0 text-subtle">
              🔗
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-foreground truncate mb-0.5">
                {bookmark.title ?? bookmark.url}
              </div>
              <div className="text-[11.5px] text-subtle truncate">{bookmark.url}</div>
            </div>
            {!bookmark.is_read && (
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
