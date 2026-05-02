"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { useRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: (value: string) => void;
  autoFocus?: boolean;
}

export default function SearchInput({ value, onChange, onEnter, autoFocus }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle pointer-events-none" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") onEnter?.(value); }}
        placeholder="제목, 내용, 태그로 검색…"
        autoFocus={autoFocus}
        className="w-full h-[50px] bg-surface border border-border rounded-xl pl-11 pr-11 text-[14px] text-foreground placeholder:text-subtle outline-none transition-all focus:border-border-focus focus:shadow-[0_0_0_3px_rgba(99,102,241,0.08)]"
      />
      {value && (
        <button
          onClick={() => { onChange(""); inputRef.current?.focus(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-overlay text-subtle hover:text-muted transition-colors"
        >
          <XIcon className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
