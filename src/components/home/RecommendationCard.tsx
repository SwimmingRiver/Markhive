"use client";
import { SparklesIcon, ArrowUpRightIcon } from "lucide-react";
import { useReadRecommendationQuery } from "@/hooks/bookmarks/useReadRecommendationQuery";

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "오늘 저장";
  if (days === 1) return "어제 저장";
  return `${days}일 전 저장`;
}

export default function RecommendationCard() {
  const { data: bookmark, isPending } = useReadRecommendationQuery();

  if (isPending) {
    return (
      <div className="bg-surface border border-border rounded-xl px-6 py-5 animate-pulse h-[160px]" />
    );
  }

  if (!bookmark) {
    return (
      <div className="bg-surface border border-border rounded-xl px-6 py-5 text-[13px] text-muted">
        읽지 않은 북마크가 없어요. 새 링크를 저장해보세요.
      </div>
    );
  }

  const tags = bookmark.bookmark_tags
    .map(({ tags }) => tags?.name)
    .filter(Boolean) as string[];

  return (
    <div className="relative bg-surface border border-border rounded-xl overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-60px] right-[-40px] w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.10)_0%,transparent_70%)]" />
      </div>

      <div className="relative px-6 py-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary-soft border border-border-focus rounded-full">
            <SparklesIcon className="w-3 h-3 text-primary-light" />
            <span className="text-[10px] font-semibold tracking-widest uppercase text-primary-light">
              오늘의 AI 추천
            </span>
          </div>
          <span className="text-[11px] text-subtle">
            {timeAgo(bookmark.created_at)}
          </span>
        </div>

        <h2 className="font-serif text-[20px] leading-snug text-foreground mb-2">
          {bookmark.title ?? bookmark.url}
        </h2>
        <p className="text-[13px] text-muted leading-relaxed mb-4">
          {bookmark.summary}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[11px] bg-primary-soft border border-border-focus rounded-full text-primary-light"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 h-9 px-4 bg-primary hover:bg-primary-light text-white text-[13px] font-medium rounded-lg transition-colors shrink-0"
          >
            읽기
            <ArrowUpRightIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
