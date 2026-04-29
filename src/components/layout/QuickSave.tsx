import { useCreateBookmarkMutation } from "@/hooks/bookmarks/useCreateBookmarkMutation";
import { useRef } from "react";

export default function QuickSave() {
  const {
    mutate: createBookmark,
    isPending,
    reset,
  } = useCreateBookmarkMutation();
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

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex items-center gap-2 justify-center w-full"
    >
      <input
        type="url"
        name="url"
        placeholder="URL을 붙여넣어 저장..."
        disabled={isPending}
        autoComplete="off"
        className="w-48 sm:w-72 md:w-96 lg:w-[480px] h-10 bg-overlay border border-border rounded-lg px-4 text-sm text-foreground placeholder:text-subtle outline-none transition-[border-color,box-shadow] focus:border-border-focus focus:shadow-[0_0_0_3px_rgba(99,102,241,0.18)] disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isPending}
        className="h-10 px-5 bg-primary hover:bg-primary-light text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 shrink-0"
      >
        {isPending ? "저장 중…" : "저장"}
      </button>
    </form>
  );
}
