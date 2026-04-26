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

  return (
    <ClientLayout email={user?.email ?? ""}>
      <main className="flex-1 overflow-auto">{children}</main>
    </ClientLayout>
  );
}
