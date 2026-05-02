"use client";

import { useReadBookmarksQuery } from "@/hooks/bookmarks/useReadBookmarksQuery";
import { StatusFilter } from "./types";
import FilterBar from "./FilterBar";
import BookmarkCard from "./BookmarkCard";

interface LibraryViewProps {
  status: StatusFilter;
  activeTag: string | null;
  onStatusChange: (status: StatusFilter) => void;
  onTagChange: (tag: string | null) => void;
}

export default function LibraryView({
  status,
  activeTag,
  onStatusChange,
  onTagChange,
}: LibraryViewProps) {
  const { data: bookmarks, isLoading } = useReadBookmarksQuery();

  const allTags = [
    ...new Set(
      (bookmarks ?? []).flatMap((b) =>
        b.bookmark_tags.flatMap((bt) => (bt.tags ? [bt.tags.name] : [])),
      ),
    ),
  ];

  const filtered = (bookmarks ?? []).filter((b) => {
    const statusOk =
      status === "all" ||
      (status === "unread" && !b.is_read) ||
      (status === "read" && b.is_read);
    const tagOk =
      !activeTag ||
      b.bookmark_tags.some((bt) => bt.tags?.name === activeTag);
    return statusOk && tagOk;
  });

  return (
    <div className="px-8 py-10 max-w-[1000px] mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-[28px] leading-snug text-foreground">라이브러리</h1>
        <p className="text-[13px] text-muted mt-1">저장한 모든 북마크</p>
      </div>

      <FilterBar
        status={status}
        activeTag={activeTag}
        allTags={allTags}
        count={filtered.length}
        onStatusChange={onStatusChange}
        onTagChange={onTagChange}
      />

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-3 gap-3.5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[260px] bg-surface border border-border rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-subtle">
          <div className="w-10 h-10 border border-dashed border-border rounded-full flex items-center justify-center">
            <span className="text-lg">○</span>
          </div>
          <p className="text-[13px]">
            {bookmarks?.length === 0
              ? "아직 저장한 북마크가 없어요"
              : "해당 조건의 북마크가 없어요"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3.5">
          {filtered.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      )}
    </div>
  );
}
