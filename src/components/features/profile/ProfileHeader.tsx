interface ProfileHeaderProps {
  displayName: string;
  email: string;
  createdAt: string;
}

export default function ProfileHeader({ displayName, email, createdAt }: ProfileHeaderProps) {
  const initial = (displayName || email).charAt(0).toUpperCase();
  const joinedAt = new Date(createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="flex items-center gap-5 bg-surface border border-border rounded-xl p-6 mb-4">
      <div className="shrink-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-[22px] font-medium text-white">
        {initial}
      </div>
      <div>
        <p className="text-[17px] font-medium text-foreground tracking-tight">{displayName || email}</p>
        <p className="text-[13px] text-muted mt-0.5">{email}</p>
        <p className="text-[12px] text-subtle mt-2">{joinedAt}부터 사용 중</p>
      </div>
    </div>
  );
}
