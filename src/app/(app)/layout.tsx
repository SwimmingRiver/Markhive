import createClient from "@/lib/supabase/server";
import ClientLayout from "@/components/layout/clientLayout";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName = user?.user_metadata?.display_name ?? user?.user_metadata?.full_name ?? user?.email ?? "";

  return (
    <ClientLayout email={displayName}>
      <main className="flex-1 overflow-auto">{children}</main>
    </ClientLayout>
  );
}
