"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, X, ArrowUpRight, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
import type { MemberProject } from "@/lib/project-data";
import type { ProjectCategory } from "@/lib/project-categories";
import { PROJECT_CATEGORIES, PROJECT_CATEGORY_LABELS } from "@/lib/project-categories";

function describeError(data: { error?: string; issues?: Record<string, string[]> }): string {
  const firstIssue = data.issues && Object.values(data.issues).flat()[0];
  return firstIssue ?? data?.error ?? "Something went wrong.";
}

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

type TabKey = "about" | "skills" | "work" | "stats";

const TABS: { key: TabKey; label: string }[] = [
  { key: "about", label: "About" },
  { key: "skills", label: "Skills & tools" },
  { key: "work", label: "Work by you" },
  { key: "stats", label: "By the numbers" },
];

export default function MemberEditPanel({
  memberSlug,
  initial,
  hasDraft,
  onSaved,
}: {
  memberSlug: string;
  initial: DraftData;
  hasDraft: boolean;
  onSaved?: () => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState<TabKey>("about");

  const [name, setName] = useState(initial.name);
  const [role, setRole] = useState(initial.role);
  const [avatar, setAvatar] = useState(initial.avatar);
  const [bio, setBio] = useState(initial.bio);
  const [longBio, setLongBio] = useState(initial.longBio);
  const [highlights, setHighlights] = useState<string[]>(initial.highlights);
  const [skills, setSkills] = useState<string[]>(initial.skills);
  const [stats, setStats] = useState<Stat[]>(initial.stats);
  const [newHighlight, setNewHighlight] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [workRefreshKey, setWorkRefreshKey] = useState(0);

  const saveDraft = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/member/draft", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, avatar, bio, longBio, highlights, skills, stats }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Failed to save draft.");
        return;
      }
      setMessage("Draft saved.");
      router.refresh();
      onSaved?.();
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
      // Publish always saves the current form state as the draft first, so
      // clicking Publish directly (without a separate Save Draft click)
      // still publishes what's on screen instead of failing with
      // "No unpublished changes" when nothing was saved yet.
      const saveRes = await fetch("/api/member/draft", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, avatar, bio, longBio, highlights, skills, stats }),
      });
      if (!saveRes.ok) {
        const saveData = await saveRes.json();
        setError(saveData?.error ?? "Failed to save before publishing.");
        return;
      }

      const res = await fetch("/api/member/publish", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Failed to publish.");
        return;
      }

      // Publish also ships any pending project additions/edits under "Work
      // by you" — otherwise members expect one Publish click to go fully
      // live, but projects would stay stuck as drafts until published
      // individually from their own detail page.
      const projectsRes = await fetch("/api/member/projects/publish-all", { method: "POST" });
      const projectsData = await projectsRes.json();
      if (!projectsRes.ok) {
        setError(projectsData?.error ?? "Profile published, but failed to publish projects.");
        return;
      }
      setWorkRefreshKey((k) => k + 1);

      const publishedSomething = !data.unchanged || projectsData.publishedCount > 0;
      setMessage(
        publishedSomething
          ? "Published! Your changes are now live."
          : "Nothing to publish — this already matches your live page."
      );
      router.refresh();
      onSaved?.();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setPublishing(false);
    }
  };

  const addHighlight = () => {
    const value = newHighlight.trim();
    if (!value) return;
    setHighlights((prev) => [...prev, value]);
    setNewHighlight("");
  };

  const addSkill = () => {
    const value = newSkill.trim();
    if (!value) return;
    setSkills((prev) => [...prev, value]);
    setNewSkill("");
  };

  const addStat = () => {
    setStats((prev) => [...prev, { value: 0, suffix: "+", label: "" }]);
  };

  const updateStat = (index: number, patch: Partial<Stat>) => {
    setStats((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] bg-white border-t border-black/10 shadow-[0_-12px_40px_rgba(0,0,0,0.12)] rounded-t-2xl md:rounded-t-3xl">
      {/* Header bar — always visible */}
      <div className="flex items-center justify-between gap-3 px-6 md:px-8 py-4 border-b border-black/10">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-3 min-w-0"
        >
          <span className="w-2 h-2 rounded-full bg-red flex-shrink-0" />
          <span className="font-display text-base md:text-lg font-bold truncate">Edit your page</span>
          {hasDraft && (
            <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-widest text-red bg-red/10 rounded-full px-2.5 py-1 flex-shrink-0">
              Unpublished changes
            </span>
          )}
          {open ? <ChevronDown size={16} className="text-black/40" /> : <ChevronUp size={16} className="text-black/40" />}
        </button>

        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {message && <span className="hidden md:inline text-sm text-black/50">{message}</span>}
          <button
            type="button"
            onClick={saveDraft}
            disabled={saving}
            className="px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-black/15 text-xs md:text-sm font-semibold hover:border-black/30 transition-colors disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="button"
            onClick={publish}
            disabled={publishing}
            className="px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-red text-white text-xs md:text-sm font-semibold hover:bg-red/90 transition-colors disabled:opacity-60"
          >
            {publishing ? "Publishing..." : "Publish (Go Live)"}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 py-6 max-h-[65vh] overflow-y-auto">
          {error && (
            <p className="text-sm text-red mb-4" role="alert">
              {error}
            </p>
          )}

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-8 border-b border-black/10 -mt-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`relative px-4 py-3 text-sm font-semibold transition-colors ${
                  tab === t.key ? "text-black" : "text-black/40 hover:text-black/60"
                }`}
              >
                {t.label}
                {tab === t.key && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-red rounded-full" />}
              </button>
            ))}
          </div>

          {tab === "about" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <Field label="Full name">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-red outline-none transition-colors"
                />
              </Field>

              <Field label="Role / designation">
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-red outline-none transition-colors"
                />
              </Field>

              <Field label="Photo URL" className="md:col-span-2">
                <input
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://..."
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-red outline-none transition-colors"
                />
              </Field>

              <Field label="Short bio" className="md:col-span-2">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  maxLength={500}
                  className="w-full text-sm p-3.5 rounded-xl border border-black/15 focus:border-red outline-none resize-none transition-colors"
                />
              </Field>

              <Field label="Full about text" className="md:col-span-2">
                <textarea
                  value={longBio}
                  onChange={(e) => setLongBio(e.target.value)}
                  rows={6}
                  maxLength={5000}
                  className="w-full text-sm p-3.5 rounded-xl border border-black/15 focus:border-red outline-none resize-none transition-colors"
                />
              </Field>

              <Field label="Highlights" className="md:col-span-2">
                <div className="flex flex-col gap-2 mb-3">
                  {highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="flex-1 text-sm bg-black/[0.04] rounded-lg px-3.5 py-2.5">{h}</span>
                      <button
                        type="button"
                        onClick={() => setHighlights((prev) => prev.filter((_, idx) => idx !== i))}
                        aria-label="Remove highlight"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-black/40 hover:text-red hover:bg-red/10 transition-colors flex-shrink-0"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addHighlight();
                      }
                    }}
                    placeholder="Add a highlight..."
                    className="flex-1 text-sm px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-red outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center hover:bg-black/80 transition-colors flex-shrink-0"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </Field>
            </div>
          )}

          {tab === "skills" && (
            <Field label="Skills & tools">
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((s, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 text-sm font-medium bg-black/[0.04] rounded-full pl-4 pr-2 py-2"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => setSkills((prev) => prev.filter((_, idx) => idx !== i))}
                      aria-label="Remove skill"
                      className="w-5 h-5 rounded-full flex items-center justify-center text-black/40 hover:text-red hover:bg-red/10 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {skills.length === 0 && (
                  <p className="text-sm text-black/40">No skills added yet.</p>
                )}
              </div>
              <div className="flex gap-2 max-w-md">
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="e.g. Figma, Shopify, Next.js..."
                  className="flex-1 text-sm px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-red outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center hover:bg-black/80 transition-colors flex-shrink-0"
                >
                  <Plus size={16} />
                </button>
              </div>
            </Field>
          )}

          {tab === "work" && <WorkTab memberSlug={memberSlug} refreshKey={workRefreshKey} />}

          {tab === "stats" && (
            <Field label="Stats (shown as counters on your page)">
              <div className="flex flex-col gap-3 mb-4">
                {stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3 bg-black/[0.03] rounded-xl p-3">
                    <input
                      type="number"
                      value={stat.value}
                      onChange={(e) => updateStat(i, { value: Number(e.target.value) })}
                      className="w-20 text-sm px-3 py-2 rounded-lg border border-black/15 focus:border-red outline-none transition-colors"
                      aria-label="Stat value"
                    />
                    <input
                      value={stat.suffix}
                      onChange={(e) => updateStat(i, { suffix: e.target.value })}
                      placeholder="+"
                      className="w-14 text-sm px-3 py-2 rounded-lg border border-black/15 focus:border-red outline-none transition-colors"
                      aria-label="Stat suffix"
                    />
                    <input
                      value={stat.label}
                      onChange={(e) => updateStat(i, { label: e.target.value })}
                      placeholder="Label, e.g. Projects shipped"
                      className="flex-1 text-sm px-3 py-2 rounded-lg border border-black/15 focus:border-red outline-none transition-colors"
                      aria-label="Stat label"
                    />
                    <button
                      type="button"
                      onClick={() => setStats((prev) => prev.filter((_, idx) => idx !== i))}
                      aria-label="Remove stat"
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-black/40 hover:text-red hover:bg-red/10 transition-colors flex-shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {stats.length === 0 && <p className="text-sm text-black/40">No stats added yet.</p>}
              </div>
              <button
                type="button"
                onClick={addStat}
                className="flex items-center gap-1.5 text-sm font-semibold text-black hover:text-red transition-colors"
              >
                <Plus size={14} /> Add stat
              </button>
            </Field>
          )}
        </div>
      )}
    </div>
  );
}

function WorkTab({ memberSlug, refreshKey }: { memberSlug: string; refreshKey: number }) {
  const [projects, setProjects] = useState<MemberProject[] | null>(null);
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("general");
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    const res = await fetch("/api/member/projects");
    if (!res.ok) return;
    const data = await res.json();
    setProjects(data.projects ?? []);
  };

  useEffect(() => {
    fetch("/api/member/projects")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setProjects(data.projects ?? []);
      });
  }, [refreshKey]);

  const createProject = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }
    setCreating(true);
    setError("");
    try {
      const res = await fetch("/api/member/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category, imageUrl, linkUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(describeError(data));
        return;
      }
      setTitle("");
      setDescription("");
      setCategory("general");
      setLinkUrl("");
      setImageUrl("");
      await load();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setCreating(false);
    }
  };

  const removeProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/member/projects/${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="text-xs font-semibold uppercase tracking-widest text-black/50 mb-4 block">
          Your projects
        </span>
        {projects === null ? (
          <p className="text-sm text-black/40">Loading...</p>
        ) : projects.length === 0 ? (
          <p className="text-sm text-black/40">No projects added yet — add your first one below.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {projects.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 bg-black/[0.03] rounded-xl p-3"
              >
                <div className="w-12 h-12 rounded-lg bg-black/10 flex-shrink-0 overflow-hidden">
                  {p.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate">{p.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        p.status === "published" && !p.hasDraft
                          ? "bg-green-100 text-green-700"
                          : "bg-red/10 text-red"
                      }`}
                    >
                      {p.status === "published" && !p.hasDraft ? "Live" : "Draft / unpublished"}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-black/[0.06] text-black/50">
                      {PROJECT_CATEGORY_LABELS[p.category]}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/about/${memberSlug}/work/${p.slug}`}
                  data-cursor-hover
                  className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center hover:bg-black/80 transition-colors flex-shrink-0"
                  aria-label="Open and edit project"
                >
                  <ArrowUpRight size={16} />
                </Link>
                <button
                  type="button"
                  onClick={() => removeProject(p.id)}
                  aria-label="Delete project"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-black/40 hover:text-red hover:bg-red/10 transition-colors flex-shrink-0"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-black/10 pt-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-black/50 mb-4 block">
          Add a new project
        </span>
        {error && (
          <p className="text-sm text-red mb-3" role="alert">
            {error}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title"
            className="text-sm px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-red outline-none transition-colors"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ProjectCategory)}
            className="text-sm px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-red outline-none transition-colors bg-white"
          >
            {PROJECT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {PROJECT_CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
          <input
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Live site / store link (https://...)"
            className="md:col-span-2 text-sm px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-red outline-none transition-colors"
          />
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL (https://...)"
            className="md:col-span-2 text-sm px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-red outline-none transition-colors"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description of the project"
            rows={3}
            className="md:col-span-2 text-sm p-3.5 rounded-xl border border-black/15 focus:border-red outline-none resize-none transition-colors"
          />
        </div>
        <button
          type="button"
          onClick={createProject}
          disabled={creating}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-red text-white text-sm font-semibold hover:bg-red/90 transition-colors disabled:opacity-60"
        >
          <Plus size={15} />
          {creating ? "Adding..." : "Add project"}
        </button>
        <p className="text-xs text-black/40 mt-2">
          New projects start as drafts. Open the project to edit and publish it.
        </p>
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
