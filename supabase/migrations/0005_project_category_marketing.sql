-- ============================================================
-- Widens the project category constraint to cover Digital
-- Marketing & WordPress disciplines (Yunus Ali), not just the
-- graphic-design set added in 0003/0004.
-- Run this once in the Supabase SQL editor (or via `supabase db push`).
-- ============================================================

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
