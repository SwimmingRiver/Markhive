"use client";

import SearchInput from "@/components/search/SearchInput";
import SearchInitialView from "@/components/search/SearchInitialView";
import SearchResultsView from "@/components/search/SearchResultsView";
import { useSearchPage } from "@/hooks/search/useSearchPage";

export default function SearchPage() {
  const {
    query,
    recentSearches,
    searchedBookmarks,
    isLoading,
    topTags,
    handleQueryChange,
    handleSelectRecent,
    handleSelectTag,
    handleEnter,
  } = useSearchPage();

  return (
    <div className="px-8 py-10 max-w-[1000px] mx-auto w-full">
      <div className="mb-8">
        <h1 className="font-serif text-[28px] leading-snug text-foreground">
          검색
        </h1>
        <p className="text-[13px] text-muted mt-1">
          저장한 북마크를 제목, 내용, 태그로 찾아보세요
        </p>
      </div>

      <div className="mb-6">
        <SearchInput
          value={query}
          onChange={handleQueryChange}
          onEnter={handleEnter}
          autoFocus
        />
      </div>

      {query ? (
        <SearchResultsView
          query={query}
          results={searchedBookmarks ?? []}
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
