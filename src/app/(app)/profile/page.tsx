import createClient from "@/lib/supabase/server";
import ProfileHeader from "@/components/features/profile/ProfileHeader";
import ProfileStats from "@/components/features/profile/ProfileStats";
import ProfileForm from "@/components/features/profile/ProfileForm";
import DangerZone from "@/components/features/profile/DangerZone";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const displayName: string =
    user.user_metadata?.display_name ??
    user.user_metadata?.full_name ??
    "";
  const bio: string = user.user_metadata?.bio ?? "";
  const email: string = user.email ?? "";
  const createdAt: string = user.created_at;

  return (
    <div className="px-8 py-10 flex flex-col gap-6 max-w-[760px] mx-auto w-full">
      <div>
        <h1 className="font-serif text-[26px] tracking-tight text-foreground mb-1">Profile</h1>
        <p className="text-[13px] text-subtle">계정 정보와 설정을 관리하세요</p>
      </div>

      <ProfileHeader displayName={displayName} email={email} createdAt={createdAt} />
      <ProfileStats />
      <ProfileForm displayName={displayName} bio={bio} email={email} />
      <DangerZone />
    </div>
  );
}
