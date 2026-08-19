import { NextResponse } from "next/server";
import { destroyAdminSession } from "@/lib/auth/admin-session";

export async function POST() {
  await destroyAdminSession();
  return NextResponse.json({ ok: true });
}
