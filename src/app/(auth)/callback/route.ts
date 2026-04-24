import { redirect } from "next/navigation";
import createClient from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    // code → 세션 교환 (쿠키에 세션 저장됨)
    await supabase.auth.exchangeCodeForSession(code);
  }

  redirect("/dashboard");
}
