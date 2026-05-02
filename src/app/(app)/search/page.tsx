"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useReadBookmarksQuery } from "@/hooks/bookmarks/useReadBookmarksQuery";
import SearchInput from "@/components/search/SearchInput";
import SearchInitialView from "@/components/search/SearchInitialView";
import SearchResultsView from "@/components/search/SearchResultsView";

const RECENT_KEY = "mh_recent_searches";
const MAX_RECENT = 8;

function loadRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveRecent(query: string) {
  const prev = loadRecent().filter((q) => q !== query);
  localStorage.setItem(RECENT_KEY, JSON.stringify([query, ...prev].slice(0, MAX_RECENT)));
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { data: bookmarks, isLoading } = useReadBookmarksQuery();

  useEffect(() => {
    setRecentSearches(loadRecent());
  }, []);

  const topTags = useMemo(() => {
    const freq = new Map<string, number>();
    for (const b of bookmarks ?? []) {
      for (const bt of b.bookmark_tags) {
        if (bt.tags) freq.set(bt.tags.name, (freq.get(bt.tags.name) ?? 0) + 1);
      }
    }
    return [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name]) => name);
  }, [bookmarks]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return (bookmarks ?? []).filter((b) => {
      const inTitle = b.title?.toLowerCase().includes(q);
      const inSummary = b.summary?.toLowerCase().includes(q);
      const inUrl = b.url.toLowerCase().includes(q);
      const inTags = b.bookmark_tags.some((bt) => bt.tags?.name.toLowerCase().includes(q));
      return inTitle || inSummary || inUrl || inTags;
    });
  }, [bookmarks, query]);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const handleSelectRecent = useCallback((q: string) => {
    setQuery(q);
  }, []);

  const handleSelectTag = useCallback((tag: string) => {
    setQuery(tag);
  }, []);

  const trimmedQuery = query.trim();

  return (
    <div className="px-8 py-10 max-w-[1000px] mx-auto w-full">
      <div className="mb-8">
        <h1 className="font-serif text-[28px] leading-snug text-foreground">검색</h1>
        <p className="text-[13px] text-muted mt-1">저장한 북마크를 제목, 내용, 태그로 찾아보세요</p>
      </div>

      <div className="mb-6">
        <SearchInput
          value={query}
          onChange={handleQueryChange}
          onEnter={(v) => {
            const trimmed = v.trim();
            if (!trimmed) return;
            saveRecent(trimmed);
            setRecentSearches(loadRecent());
          }}
          autoFocus
        />
      </div>

      {trimmedQuery ? (
        <SearchResultsView
          query={trimmedQuery}
          results={results}
          isLoading={isLoading}
        />
      ) : (
        <SearchInitialView
          recentSearches={recentSearches}
          topTags={topTags}
          onSelectRecent={handleSelectRecent}
          onSelectTag={handleSelectTag}
        />
      )}
    </div>
  );
}
