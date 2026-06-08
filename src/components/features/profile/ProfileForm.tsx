"use client";

import { useActionState } from "react";
import { CheckIcon } from "lucide-react";
import { updateProfile } from "@/lib/profile/actions";

interface ProfileFormProps {
  displayName: string;
  bio: string;
  email: string;
}

export default function ProfileForm({ displayName, bio, email }: ProfileFormProps) {
  const [state, action, isPending] = useActionState(updateProfile, null);

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <h2 className="text-[13.5px] font-medium text-muted mb-5">기본 정보</h2>

      <form action={action} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] text-subtle mb-1.5">이름</label>
            <input
              name="display_name"
              defaultValue={displayName}
              className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-[13px] text-foreground outline-none focus:border-border-focus transition-colors"
            />
          </div>
          <div>
            <label className="block text-[12px] text-subtle mb-1.5">이메일 (변경 불가)</label>
            <input
              value={email}
              readOnly
              className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-[13px] text-subtle outline-none cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-[12px] text-subtle mb-1.5">소개 (선택)</label>
          <input
            name="bio"
            defaultValue={bio}
            placeholder="짧은 소개를 입력하세요"
            className="w-full bg-canvas border border-border rounded-lg px-3 py-2 text-[13px] text-foreground placeholder:text-subtle outline-none focus:border-border-focus transition-colors"
          />
        </div>

        {state && !state.success && (
          <p className="text-[12px] text-error">{state.error}</p>
        )}
        {state?.success && (
          <p className="text-[12px] text-success">저장되었습니다</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-1.5 px-5 py-2 bg-primary rounded-lg text-[13px] font-medium text-white hover:bg-primary/80 transition-colors disabled:opacity-50"
        >
          <CheckIcon className="w-4 h-4" />
          {isPending ? "저장 중..." : "변경사항 저장"}
        </button>
      </form>
    </div>
  );
}
