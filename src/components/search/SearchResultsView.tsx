"use client";

import BookmarkCard from "@/components/library/BookmarkCard";
import { Bookmark } from "@/components/library/types";

interface SearchResultsViewProps {
  query: string;
  results: Bookmark[];
  isLoading: boolean;
  onSearch?: (query: string) => void;
}

export default function SearchResultsView({ query, results, isLoading }: SearchResultsViewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-3.5 pt-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-[260px] bg-surface border border-border rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-subtle">
        <div className="w-12 h-12 border border-dashed border-border rounded-full flex items-center justify-center">
          <span className="font-serif text-xl">?</span>
        </div>
        <p className="font-serif text-[17px] text-muted">검색 결과가 없어요</p>
        <p className="text-[13px] text-center leading-relaxed">
          다른 키워드나 태그로 다시 검색해 보세요
        </p>
      </div>
    );
  }

  return (
    <div className="pt-2">
      <p className="text-[12px] text-subtle mb-4">
        <span className="text-muted font-medium">{results.length}개</span> 결과
      </p>
      <div className="grid grid-cols-3 gap-3.5">
        {results.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </div>
  );
}
