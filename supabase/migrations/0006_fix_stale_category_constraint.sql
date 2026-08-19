-- ============================================================
-- 0005 tried to drop constraints named projects_draft_category_check /
-- projects_published_category_check, but the original constraint from
-- 0003 kept its old name (projects_category_check) even after the
-- column was renamed to draft_category in 0004 — so it was never
-- actually dropped, and new marketing categories kept failing.
-- This drops the real leftover constraint by its actual name.
-- Run this once in the Supabase SQL editor (or via `supabase db push`).
-- ============================================================

alter table projects drop constraint if exists projects_category_check;

-- Re-assert both check constraints in case 0005 already added them —
-- this is safe to re-run.
alter table projects drop constraint if exists projects_draft_category_check;
alter table projects drop constraint if exists projects_published_category_check;

alter table projects
  add constraint projects_draft_category_check
  check (draft_category in (
    'general', 'logo', 'branding', 'social', 'packaging', 'print', 'uiux',
    'seo', 'paidads', 'content', 'wordpress'
  ));

alter table projects
  add constraint projects_published_category_check
  check (published_category in (
    'general', 'logo', 'branding', 'social', 'packaging', 'print', 'uiux',
    'seo', 'paidads', 'content', 'wordpress'
  ));
