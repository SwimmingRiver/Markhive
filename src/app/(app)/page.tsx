import createClient from "@/lib/supabase/server";
import RecentBookmarks from "@/components/bookmark/RecentBookmarks";
import StatsCards from "@/components/home/StatsCards";
import RecommendationCard from "@/components/home/RecommendationCard";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName = user?.email?.split("@")[0] ?? "님";

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="px-8 py-10 flex flex-col gap-10 max-w-[760px] mx-auto w-full">

      {/* 인삿말 */}
      <div className="flex flex-col gap-1">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-subtle">
          {today}
        </p>
        <h1 className="font-serif text-[28px] leading-snug text-foreground">
          좋은 하루예요, {displayName}님
        </h1>
        <p className="text-[13px] text-muted mt-0.5">
          오늘도 읽을 거리를 쌓고, 꼭 필요한 것만 꺼내 읽어요.
        </p>
      </div>

      {/* 통계 요약 */}
      <StatsCards />

      {/* 오늘의 AI 추천 */}
      <RecommendationCard />

      {/* 최근 저장 */}
      <RecentBookmarks />
    </div>
  );
}
