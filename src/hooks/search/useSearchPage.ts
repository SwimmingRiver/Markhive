import { useState, useMemo, useCallback } from "react";
import { loadRecent, saveRecent } from "@/lib/search/recentKeyword";
import { useReadBookmarksQuery } from "@/hooks/bookmarks/useReadBookmarksQuery";
import { useDebounce } from "@/hooks/utils/useDebounce";
import { DEBOUNCE_DELAY } from "@/constants/numbers";

export const useSearchPage = () => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(loadRecent());
  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY);

  const { data: searchedBookmarks, isLoading } = useReadBookmarksQuery({
    search_query: debouncedQuery,
  });

  const topTags = useMemo(() => {
    const freq = new Map<string, number>();
    for (const b of searchedBookmarks ?? []) {
      for (const bt of b.bookmark_tags) {
        if (bt.tags) freq.set(bt.tags.name, (freq.get(bt.tags.name) ?? 0) + 1);
      }
    }
    return [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name]) => name);
  }, [searchedBookmarks]);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value.trim());
  }, []);

  const handleSelectRecent = useCallback((q: string) => {
    setQuery(q);
  }, []);

  const handleSelectTag = useCallback((tag: string) => {
    setQuery(tag);
  }, []);

  const handleEnter = useCallback((value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setRecentSearches(saveRecent(trimmed));
  }, []);

  return {
    query,
    recentSearches,
    searchedBookmarks,
    isLoading,
    topTags,
    handleQueryChange,
    handleSelectRecent,
    handleSelectTag,
    handleEnter,
  };
};
