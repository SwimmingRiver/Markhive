import createClient from "@/lib/supabase/server";
import Header from "@/components/layout/header";
import SNB from "@/components/layout/SNB";

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
    <div className="flex flex-col h-full">
      <Header email={user?.email ?? ""} />
      <div className="flex flex-1 overflow-hidden">
        <SNB />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
