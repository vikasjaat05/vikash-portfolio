import { NextResponse } from "next/server";
import { getMemberSession } from "@/lib/auth/member-session";
import { getAdminSession } from "@/lib/auth/admin-session";

export async function GET() {
  const memberSession = await getMemberSession();
  if (memberSession) {
    return NextResponse.json({ role: "member", slug: memberSession.slug });
  }

  const adminSession = await getAdminSession();
  if (adminSession) {
    return NextResponse.json({ role: "admin", slug: null });
  }

  return NextResponse.json({ role: null, slug: null });
}
