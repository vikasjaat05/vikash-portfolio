-- ============================================================
-- Team Portfolio CMS — initial schema
-- Run this once in the Supabase SQL editor (or via `supabase db push`).
-- ============================================================

create extension if not exists pgcrypto;

-- ============================================================
-- ADMIN (single super-admin identity, PIN-based like members)
-- ============================================================
create table admins (
  id                uuid primary key default gen_random_uuid(),
  label             text not null default 'Admin',
  pin_hash          text not null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create table admin_attempts (
  id              uuid primary key default gen_random_uuid(),
  admin_id        uuid not null references admins(id) on delete cascade,
  failed_count    integer not null default 0,
  locked_until    timestamptz,
  last_attempt_at timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (admin_id)
);

create table admin_sessions (
  id                  uuid primary key default gen_random_uuid(),
  admin_id            uuid not null references admins(id) on delete cascade,
  session_token_hash  text not null unique,
  created_at          timestamptz not null default now(),
  expires_at          timestamptz not null,
  revoked_at          timestamptz
);

-- ============================================================
-- TEAM MEMBERS
-- ============================================================
create table team_members (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  pin_hash          text not null,
  is_active         boolean not null default true,

  -- PUBLISHED — what real visitors see (Founder-shaped JSON)
  published_data    jsonb not null,
  published_at      timestamptz,

  -- DRAFT — the member's working copy; null = no unpublished changes
  draft_data        jsonb,
  draft_updated_at  timestamptz,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on column team_members.published_data is
  'Founder-shaped JSON: name, role, focus, categorySlug, bio, longBio, highlights[], skills[], stats[], gradient, avatar.';
comment on column team_members.draft_data is
  'Same shape as published_data. NULL means draft == published (no pending changes).';

create table pin_attempts (
  id              uuid primary key default gen_random_uuid(),
  member_id       uuid not null references team_members(id) on delete cascade,
  failed_count    integer not null default 0,
  locked_until    timestamptz,
  last_attempt_at timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (member_id)
);

create table member_sessions (
  id                  uuid primary key default gen_random_uuid(),
  member_id           uuid not null references team_members(id) on delete cascade,
  session_token_hash  text not null unique,
  created_at          timestamptz not null default now(),
  expires_at          timestamptz not null,
  revoked_at          timestamptz
);

create index member_sessions_member_id_idx on member_sessions(member_id);
create index member_sessions_expiry_idx on member_sessions(expires_at) where revoked_at is null;

-- ============================================================
-- PROJECTS (each member's portfolio items)
-- ============================================================
create table projects (
  id                      uuid primary key default gen_random_uuid(),
  member_id               uuid not null references team_members(id) on delete cascade,
  slug                    text not null,
  status                  text not null default 'draft' check (status in ('draft', 'published')),

  draft_title             text not null,
  draft_description       text not null,
  draft_image_path        text,
  draft_link_url          text,

  published_title         text,
  published_description   text,
  published_image_path    text,
  published_link_url      text,
  published_at            timestamptz,

  deleted_at              timestamptz,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),

  unique (member_id, slug)
);

create index projects_member_id_idx on projects(member_id);
create index projects_status_idx on projects(status) where deleted_at is null;

-- ============================================================
-- updated_at housekeeping
-- ============================================================
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger admins_touch before update on admins
  for each row execute function set_updated_at();
create trigger admin_attempts_touch before update on admin_attempts
  for each row execute function set_updated_at();
create trigger team_members_touch before update on team_members
  for each row execute function set_updated_at();
create trigger pin_attempts_touch before update on pin_attempts
  for each row execute function set_updated_at();
create trigger projects_touch before update on projects
  for each row execute function set_updated_at();
