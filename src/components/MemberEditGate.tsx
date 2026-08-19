"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import MemberEditPanel from "./MemberEditPanel";

type SessionState = { role: "member" | "admin" | null; slug: string | null };
type Stat = { value: number; suffix: string; label: string };
type DraftData = {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  longBio: string;
  highlights: string[];
  skills: string[];
  stats: Stat[];
};

// This component never shows a public login button or PIN box — logging in
// only happens at /admin/login. It only ever renders anything when the
// visitor already has a valid session that matches this exact page's slug.
export default function MemberEditGate({ pageSlug }: { pageSlug: string }) {
  const router = useRouter();
  const [session, setSession] = useState<SessionState>({ role: null, slug: null });
  const [checked, setChecked] = useState(false);
  const [draft, setDraft] = useState<{ current: DraftData; hasDraft: boolean } | null>(null);

  const loadDraft = async () => {
    const res = await fetch("/api/member/draft");
    if (!res.ok) return;
    const data = await res.json();
    setDraft(data);
  };

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data: SessionState) => {
        setSession(data);
        if (data.role === "member" && data.slug === pageSlug) {
          loadDraft();
        }
      })
      .finally(() => setChecked(true));
  }, [pageSlug]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setSession({ role: null, slug: null });
    setDraft(null);
    router.refresh();
  };

  const isEditingThisPage = session.role === "member" && session.slug === pageSlug;

  if (!checked || !isEditingThisPage) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[80]">
        <div className="flex items-center gap-2 rounded-full bg-[#0a0a0a] text-white pl-4 pr-2 py-2 shadow-2xl">
          <span className="text-sm font-medium">Editing your page</span>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Log out"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>

      {draft && (
        <MemberEditPanel
          memberSlug={pageSlug}
          initial={draft.current}
          hasDraft={draft.hasDraft}
          onSaved={loadDraft}
        />
      )}
    </>
  );
}
