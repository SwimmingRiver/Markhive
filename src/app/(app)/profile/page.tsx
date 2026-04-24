import createClient from "@/lib/supabase/server";
export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="text-primary">
      <h1>프로필 설정</h1>
      <p>{user?.email}</p>
      <div>저장된 북마크 정보 컴포넌트</div>
      <div>유저 정보 수정 폼 컴포넌트</div>
      <div>리마인드 알림 설정 폼 컴포넌트</div>
    </div>
  );
}
