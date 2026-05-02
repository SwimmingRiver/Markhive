"use client";

import { SearchIcon } from "lucide-react";

interface SearchInitialViewProps {
  recentSearches: string[];
  topTags: string[];
  onSelectRecent: (query: string) => void;
  onSelectTag: (tag: string) => void;
}

export default function SearchInitialView({
  recentSearches,
  topTags,
  onSelectRecent,
  onSelectTag,
}: SearchInitialViewProps) {
  return (
    <div className="flex flex-col gap-8 pt-2">
      {recentSearches.length > 0 && (
        <section>
          <p className="text-[10.5px] font-mono tracking-widest uppercase text-subtle mb-3">
            최근 검색
          </p>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((q) => (
              <button
                key={q}
                onClick={() => onSelectRecent(q)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border rounded-full text-[12px] text-muted hover:border-white/10 hover:text-foreground hover:bg-overlay transition-colors"
              >
                <SearchIcon className="w-3 h-3 text-subtle flex-shrink-0" />
                {q}
              </button>
            ))}
          </div>
        </section>
      )}

      {topTags.length > 0 && (
        <section>
          <p className="text-[10.5px] font-mono tracking-widest uppercase text-subtle mb-3">
            자주 쓰는 태그
          </p>
          <div className="flex flex-wrap gap-2">
            {topTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onSelectTag(tag)}
                className="px-3 py-1 bg-primary-soft border border-border-focus rounded-full text-[11px] font-medium text-primary-light hover:bg-[rgba(99,102,241,0.2)] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
