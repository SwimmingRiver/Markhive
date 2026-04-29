"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MoreHorizontalIcon,
  CheckIcon,
  TrashIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { useReadBookmarksQuery } from "@/hooks/bookmarks/useReadBookmarksQuery";
import { useUpdateBookmarkMutation } from "@/hooks/bookmarks/useUpdateBookmarkMutation";

function BookmarkMenu({ id, isRead }: { id: string; isRead: boolean }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { mutate: updateBookmark } = useUpdateBookmarkMutation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative shrink-0">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="w-7 h-7 flex items-center justify-center rounded-md text-subtle hover:text-foreground hover:bg-overlay transition-colors"
      >
        <MoreHorizontalIcon className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-10 w-40 bg-overlay border border-border rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.4)] overflow-hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              updateBookmark({ id, is_read: !isRead });
              setOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-foreground hover:bg-surface transition-colors"
          >
            <CheckIcon className="w-3.5 h-3.5 text-success" />
            {isRead ? "안읽음 처리" : "읽음 처리"}
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-foreground hover:bg-surface transition-colors"
          >
            <ExternalLinkIcon className="w-3.5 h-3.5 text-muted" />새 탭에서
            열기
          </button>
          <div className="h-px bg-border mx-2" />
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-error hover:bg-surface transition-colors"
          >
            <TrashIcon className="w-3.5 h-3.5" />
            삭제
          </button>
        </div>
      )}
    </div>
  );
}

export default function RecentBookmarks() {
  const { data: bookmarks, isLoading } = useReadBookmarksQuery();

  if (isLoading) {
    return (
      <div className="w-full max-w-[720px]">
        <div className="flex flex-col gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-[52px] bg-surface border border-border rounded-lg animate-pulse"
            />
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
            className="flex items-center gap-3 px-4 py-3 bg-surface border border-border rounded-lg hover:border-border-focus transition-colors"
          >
            <div className="w-7 h-7 rounded-md bg-overlay border border-border flex items-center justify-center text-xs shrink-0 text-subtle">
              🔗
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-foreground truncate mb-0.5">
                {bookmark.title ?? bookmark.url}
              </div>
              <div className="text-[11.5px] text-subtle truncate">
                {bookmark.url}
              </div>
            </div>
            <div className="flex gap-1.5 shrink-0">
              {bookmark.bookmark_tags.slice(0, 2).map(({ tags }) =>
                tags ? (
                  <span
                    key={tags.name}
                    className="px-2 py-0.5 text-[11px] bg-primary-soft border border-border-focus rounded-full text-primary-light"
                  >
                    {tags.name}
                  </span>
                ) : null,
              )}
            </div>
            {!bookmark.is_read && (
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            )}
            <BookmarkMenu id={bookmark.id} isRead={bookmark.is_read ?? false} />
          </div>
        ))}
      </div>
    </div>
  );
}
