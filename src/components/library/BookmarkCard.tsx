"use client";

import { CheckIcon, ClockIcon } from "lucide-react";
import { useUpdateBookmarkMutation } from "@/hooks/bookmarks/useUpdateBookmarkMutation";
import { Bookmark } from "./types";

function domain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const { mutate: update } = useUpdateBookmarkMutation();
  const isRead = bookmark.is_read ?? false;
  const tags = bookmark.bookmark_tags.flatMap((bt) => (bt.tags ? [bt.tags.name] : []));

  return (
    <article className="group flex flex-col bg-surface border border-border rounded-xl overflow-hidden hover:-translate-y-0.5 hover:border-white/10 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-150">
      {/* Thumbnail */}
      <div className="relative h-[100px] bg-overlay overflow-hidden shrink-0">
        {bookmark.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bookmark.image_url}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-overlay to-canvas" />
        )}
        {!isRead && (
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary border-2 border-surface" />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 px-3.5 pt-3 pb-2.5 flex-1">
        <span className="text-[10.5px] text-subtle font-mono truncate">
          {domain(bookmark.url)}
        </span>

        <h2
          className={`font-serif text-[14px] leading-snug line-clamp-2 ${
            isRead ? "text-muted" : "text-foreground"
          }`}
        >
          {bookmark.title ?? bookmark.url}
        </h2>

        {bookmark.summary && (
          <p className="text-[11.5px] text-muted leading-relaxed line-clamp-2">
            {bookmark.summary}
          </p>
        )}

        {tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mt-auto pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-medium bg-primary-soft border border-border-focus rounded-full text-primary-light"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3.5 py-2 border-t border-border">
        <span className="text-[10.5px] text-subtle">
          {bookmark.created_at
            ? new Date(bookmark.created_at).toLocaleDateString("ko-KR", {
                month: "short",
                day: "numeric",
              })
            : ""}
        </span>
        <button
          onClick={() => update({ id: bookmark.id, is_read: !isRead })}
          className="flex items-center gap-1 px-2 py-1 rounded-md border border-border text-subtle text-[11px] hover:border-white/10 hover:text-muted transition-colors"
        >
          {isRead ? (
            <>
              <ClockIcon className="w-3 h-3" />
              읽음 취소
            </>
          ) : (
            <>
              <CheckIcon className="w-3 h-3" />
              읽음 처리
            </>
          )}
        </button>
      </div>
    </article>
  );
}
