export default function BrandPanel() {
  return (
    <div className="w-[40%] flex flex-col justify-center px-8 py-10 relative overflow-hidden border-r border-r-border bg-canvas">
      <div className="absolute bottom-[-80px] right-[-80px] w-[260px] h-[260px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(99,102,241,0.13)_0%,transparent_70%)]" />
      <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 text-primary-light">
        AI 북마크 매니저
      </p>
      <h2 className="font-serif text-[26px] leading-snug mb-3">
        쌓아둔 탭,
        <br />
        이제 정리하세요
      </h2>
      <p className="text-[13px] leading-relaxed mb-7 text-muted">
        URL을 저장하면 AI가 자동으로 분류하고,
        <br />
        매일 읽을 거리를 골라드려요.
      </p>
      <div className="flex flex-col gap-3">
        {[
          { icon: "⚡", label: "AI 자동 태그 & 요약" },
          { icon: "◎", label: "하루 1개 맞춤 추천" },
          { icon: "◈", label: "폴더 & 태그 기반 분류" },
        ].map((f) => (
          <div key={f.label} className="flex items-center gap-[10px] text-[12px] text-muted">
            <div className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center text-[13px] shrink-0 bg-primary-soft">
              {f.icon}
            </div>
            {f.label}
          </div>
        ))}
      </div>
    </div>
  );
}
