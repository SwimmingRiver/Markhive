"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "lucide-react";

export default function DangerZone() {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!window.confirm("정말로 계정을 삭제하시겠습니까?\n모든 데이터가 영구적으로 삭제됩니다.")) return;

    setIsDeleting(true);
    const res = await fetch("/api/account", { method: "DELETE" });
    if (res.ok) {
      router.push("/login");
    } else {
      const { error } = await res.json();
      alert(error ?? "계정 삭제에 실패했습니다.");
      setIsDeleting(false);
    }
  }

  return (
    <div className="bg-surface border border-error/15 rounded-xl p-6">
      <h2 className="text-[13.5px] font-medium text-error/60 mb-3">위험 구역</h2>
      <p className="text-[13px] text-subtle leading-relaxed mb-4">
        계정을 삭제하면 모든 북마크, 태그, 데이터가 영구적으로 제거됩니다.<br />
        이 작업은 되돌릴 수 없습니다.
      </p>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-transparent border border-error/30 rounded-lg text-[13px] text-error/65 hover:bg-error/7 transition-colors disabled:opacity-50"
      >
        <TrashIcon className="w-3.5 h-3.5" />
        {isDeleting ? "삭제 중..." : "계정 삭제"}
      </button>
    </div>
  );
}
