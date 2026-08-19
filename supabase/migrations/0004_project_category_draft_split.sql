-- ============================================================
-- Fixes a bug from 0003: `category` was a single column with no
-- draft/publish gating, so changing a project's category went live
-- immediately for anonymous visitors — breaking the site's core
-- "draft first, live on Publish" promise. This splits it into
-- draft_category / published_category like every other project field.
-- Run this once in the Supabase SQL editor (or via `supabase db push`).
-- ============================================================

alter table projects rename column category to draft_category;

alter table projects
  add column published_category text
  check (published_category in ('general', 'logo', 'branding', 'social', 'packaging', 'print', 'uiux'));

-- Backfill: anything already published keeps its current category as
-- published, since that value was already live before this fix existed.
update projects
  set published_category = draft_category
  where status = 'published';

comment on column projects.draft_category is
  'Design discipline grouping the member is currently editing — becomes published_category only on Publish.';
comment on column projects.published_category is
  'Design discipline grouping visible to public visitors — null until first published.';

drop index if exists projects_category_idx;
create index projects_draft_category_idx on projects(draft_category);
create index projects_published_category_idx on projects(published_category);
