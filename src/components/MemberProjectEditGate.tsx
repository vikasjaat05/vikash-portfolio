"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import type { ProjectCategory } from "@/lib/project-categories";
import { PROJECT_CATEGORIES, PROJECT_CATEGORY_LABELS } from "@/lib/project-categories";

function describeError(data: { error?: string; issues?: Record<string, string[]> }): string {
  const firstIssue = data.issues && Object.values(data.issues).flat()[0];
  return firstIssue ?? data?.error ?? "Something went wrong.";
}

type ProjectInitial = {
  title: string;
  description: string;
  category: ProjectCategory;
  imageUrl: string | null;
  linkUrl: string | null;
  hasDraft: boolean;
};

export default function MemberProjectEditGate({
  projectId,
  initial,
}: {
  projectId: string;
  initial: ProjectInitial;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [category, setCategory] = useState<ProjectCategory>(initial.category);
  const [imageUrl, setImageUrl] = useState(initial.imageUrl ?? "");
  const [linkUrl, setLinkUrl] = useState(initial.linkUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const saveDraft = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`/api/member/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category, imageUrl, linkUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(describeError(data));
        return;
      }
      setMessage("Draft saved.");
      router.refresh();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setSaving(false);
    }
  };

  const publish = async () => {
    setPublishing(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`/api/member/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category, imageUrl, linkUrl }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(describeError(data));
        return;
      }
      const publishRes = await fetch(`/api/member/projects/${projectId}/publish`, { method: "POST" });
      const publishData = await publishRes.json();
      if (!publishRes.ok) {
        setError(describeError(publishData));
        return;
      }
      setMessage("Published! This project is now live.");
      router.refresh();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setPublishing(false);
    }
  };

  const remove = async () => {
    if (!confirm("Delete this project? This can't be undone.")) return;
    setDeleting(true);
    setError("");
    try {
      const res = await fetch(`/api/member/projects/${projectId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        setError(data?.error ?? "Failed to delete.");
        return;
      }
      router.push(`/about#work`);
      router.refresh();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] bg-white border-t border-black/10 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <div className="max-w-[900px] mx-auto px-6 py-6 max-h-[75vh] overflow-y-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="font-display text-lg font-bold">Edit this project</h2>
            {initial.hasDraft && (
              <p className="text-xs text-red font-semibold uppercase tracking-wide mt-1">
                Unpublished changes
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {message && <span className="text-sm text-black/60">{message}</span>}
            <button
              type="button"
              onClick={remove}
              disabled={deleting}
              aria-label="Delete project"
              className="w-10 h-10 rounded-full border border-black/15 text-black/50 hover:text-red hover:border-red flex items-center justify-center disabled:opacity-60"
            >
              <Trash2 size={16} />
            </button>
            <button
              type="button"
              onClick={saveDraft}
              disabled={saving}
              className="px-5 py-2.5 rounded-full border border-black/15 text-sm font-semibold disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Draft"}
            </button>
            <button
              type="button"
              onClick={publish}
              disabled={publishing}
              className="px-5 py-2.5 rounded-full bg-red text-white text-sm font-semibold disabled:opacity-60"
            >
              {publishing ? "Publishing..." : "Publish (Go Live)"}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red mb-4" role="alert">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Project title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-black/15 focus:border-red outline-none"
            />
          </Field>

          <Field label="Category">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProjectCategory)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-black/15 focus:border-red outline-none bg-white"
            >
              {PROJECT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {PROJECT_CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Live site / store link" className="md:col-span-2">
            <input
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://..."
              className="w-full text-sm px-3 py-2 rounded-lg border border-black/15 focus:border-red outline-none"
            />
          </Field>

          <Field label="Image URL" className="md:col-span-2">
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full text-sm px-3 py-2 rounded-lg border border-black/15 focus:border-red outline-none"
            />
          </Field>

          <Field label="Description" className="md:col-span-2">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={1000}
              className="w-full text-sm p-3 rounded-xl border border-black/15 focus:border-red outline-none resize-none"
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-widest text-black/50">{label}</span>
      {children}
    </label>
  );
}
