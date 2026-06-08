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
    <div className="p-8 max-w-2xl">
      <h1 className="font-serif text-[26px] tracking-tight text-foreground mb-1">Profile</h1>
      <p className="text-[13px] text-subtle mb-7">계정 정보와 설정을 관리하세요</p>

      <ProfileHeader displayName={displayName} email={email} createdAt={createdAt} />
      <ProfileStats />
      <ProfileForm displayName={displayName} bio={bio} email={email} />
      <DangerZone />
    </div>
  );
}
