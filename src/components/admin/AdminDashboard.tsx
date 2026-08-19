"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type MemberRow = {
  id: string;
  slug: string;
  is_active: boolean;
  published_data: {
    name: string;
    role: string;
    focus: string;
    avatar: string;
  };
  draft_data: unknown;
  created_at: string;
};

const CATEGORY_OPTIONS = [
  { value: "web", label: "Web & Shopify" },
  { value: "app", label: "App Development" },
  { value: "graphics", label: "Graphic Design" },
  { value: "marketing", label: "Digital Marketing" },
];

export default function AdminDashboard({ initialMembers }: { initialMembers: MemberRow[] }) {
  const router = useRouter();
  const [members, setMembers] = useState(initialMembers);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [categorySlug, setCategorySlug] = useState("web");
  const [avatar, setAvatar] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setName("");
    setRole("");
    setCategorySlug("web");
    setAvatar("");
    setPin("");
    setError("");
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, categorySlug, avatar, pin }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Failed to create member.");
        return;
      }

      resetForm();
      setShowForm(false);
      router.refresh();

      // Optimistically append so the list updates without waiting on a refetch.
      setMembers((prev) => [
        ...prev,
        {
          id: data.member.id,
          slug: data.member.slug,
          is_active: true,
          published_data: {
            name,
            role,
            focus: CATEGORY_OPTIONS.find((c) => c.value === categorySlug)?.label ?? categorySlug,
            avatar,
          },
          draft_data: null,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Team Admin</h1>
          <p style={{ color: "#666", fontSize: 14, marginTop: 4 }}>
            Add team members and manage their access.
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
            borderRadius: 999,
            border: "1px solid #ddd",
            background: "white",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Log out
        </button>
      </div>

      <div style={{ marginBottom: 24 }}>
        <button
          onClick={() => setShowForm((v) => !v)}
          style={{
            padding: "12px 20px",
            borderRadius: 999,
            border: "none",
            background: "#0a0a0a",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {showForm ? "Cancel" : "+ Add Team Member"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          style={{
            background: "white",
            borderRadius: 16,
            padding: 24,
            marginBottom: 32,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 480,
          }}
        >
          <Field label="Full name">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              style={inputStyle}
            />
          </Field>

          <Field label="Role / designation">
            <input
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Web Developer"
              style={inputStyle}
            />
          </Field>

          <Field label="Category">
            <select
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
              style={inputStyle}
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Photo URL">
            <input
              required
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://..."
              style={inputStyle}
            />
          </Field>

          <Field label="PIN (4-6 digits)">
            <input
              required
              inputMode="numeric"
              pattern="\d{4,6}"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="e.g. 4821"
              style={inputStyle}
            />
          </Field>

          {error && (
            <p style={{ color: "#e10600", fontSize: 13 }} role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: "12px 20px",
              borderRadius: 999,
              border: "none",
              background: "#e10600",
              color: "white",
              fontWeight: 600,
              cursor: submitting ? "wait" : "pointer",
              opacity: submitting ? 0.6 : 1,
            }}
          >
            {submitting ? "Creating..." : "Create Member"}
          </button>
        </form>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {members.map((m) => (
          <div
            key={m.id}
            style={{
              background: "white",
              borderRadius: 14,
              padding: 16,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <img
              src={m.published_data.avatar}
              alt={m.published_data.name}
              width={48}
              height={48}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, margin: 0 }}>{m.published_data.name}</p>
              <p style={{ color: "#666", fontSize: 13, margin: 0 }}>
                {m.published_data.role} — {m.published_data.focus}
              </p>
            </div>
            <Link
              href={`/about/${m.slug}`}
              target="_blank"
              style={{ fontSize: 13, color: "#e10600", fontWeight: 600, textDecoration: "none" }}
            >
              View page →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, fontWeight: 600 }}>
      {label}
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  fontSize: 14,
  fontWeight: 400,
};
