"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import LibraryView from "./LibraryView";
import { StatusFilter } from "./types";

export default function LibraryController() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = (searchParams.get("status") ?? "all") as StatusFilter;
  const activeTag = searchParams.get("tag");

  const update = useCallback(
    (next: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(next).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      const qs = params.toString();
      router.push(`/library${qs ? `?${qs}` : ""}`);
    },
    [router, searchParams],
  );

  const handleStatusChange = useCallback(
    (s: StatusFilter) => update({ status: s === "all" ? null : s }),
    [update],
  );

  const handleTagChange = useCallback(
    (tag: string | null) => update({ tag }),
    [update],
  );

  return (
    <LibraryView
      status={status}
      activeTag={activeTag}
      onStatusChange={handleStatusChange}
      onTagChange={handleTagChange}
    />
  );
}
