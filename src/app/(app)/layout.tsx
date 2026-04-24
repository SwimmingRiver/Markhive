import createClient from "@/lib/supabase/server";
import Header from "@/components/layout/header";

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
    <div>
      <Header email={user?.email ?? ""} />
      <main>{children}</main>
    </div>
  );
}
