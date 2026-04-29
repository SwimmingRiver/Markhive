"use client";

import { useState, useRef } from "react";
import { useCreateBookmarkMutation } from "@/hooks/bookmarks/useCreateBookmarkMutation";

export default function BookmarkInput() {
  const {
    mutate: createBookmark,
    isPending,
    error,
    reset,
  } = useCreateBookmarkMutation();
  const [isRead, setIsRead] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = (new FormData(e.currentTarget).get("url") as string).trim();
    if (!url) return;
    reset();
    createBookmark(url, {
      onSuccess: () => formRef.current?.reset(),
    });
  };

  const handleCancel = () => {
    formRef.current?.reset();
    reset();
  };

  return (
    <div className="w-full max-w-[720px] bg-surface border border-border rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.4),0_8px_32px_rgba(0,0,0,0.25)]">
      <form ref={formRef} onSubmit={handleSubmit}>
        {/* URL 입력 */}
        <div className="px-6 py-5 border-b border-border">
          <label className="block text-[11px] font-semibold tracking-widest uppercase text-subtle mb-2.5">
            URL
          </label>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="url"
              name="url"
              placeholder="https://example.com/article"
              disabled={isPending}
              autoComplete="off"
              className="w-full sm:flex-1 h-14 sm:h-12 bg-overlay border border-border rounded-lg px-3.5 text-sm text-foreground placeholder:text-subtle outline-none transition-[border-color,box-shadow] focus:border-border-focus focus:shadow-[0_0_0_3px_rgba(99,102,241,0.18)] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isPending}
              className="h-14 sm:h-12 px-5 bg-primary hover:bg-primary-light text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 shrink-0 w-full sm:w-auto"
            >
              {isPending ? "저장 중…" : "저장하기"}
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-error">{error.message}</p>}
        </div>

        {/* 액션 푸터 */}
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-subtle">
            <button
              type="button"
              onClick={() => setIsRead(!isRead)}
              className={`w-8 h-5 rounded-full border relative transition-colors shrink-0 ${
                isRead
                  ? "bg-primary border-primary"
                  : "bg-overlay border-border"
              }`}
            >
              <span
                className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-transform ${
                  isRead ? "left-0.5 translate-x-3" : "left-0.5"
                }`}
              />
            </button>
            <span>저장 후 읽음 처리</span>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className="h-9 px-4 text-sm text-muted border border-border rounded-lg hover:text-foreground hover:border-border-focus transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
