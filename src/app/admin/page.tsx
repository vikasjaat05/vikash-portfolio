import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin-session";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const supabase = getSupabaseAdmin();
  const { data: members } = await supabase
    .from("team_members")
    .select("id, slug, is_active, published_data, draft_data, created_at")
    .order("created_at", { ascending: true });

  return <AdminDashboard initialMembers={members ?? []} />;
}
