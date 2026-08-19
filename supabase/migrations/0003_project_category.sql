-- ============================================================
-- Adds a design-discipline category to each project, so a member's
-- "Work by [Name]" section can group projects the way a graphic
-- designer's portfolio naturally does (Logo Folio, Branding, Social
-- Media, Packaging, Print Media, UI/UX) instead of one flat grid.
-- Run this once in the Supabase SQL editor (or via `supabase db push`).
-- ============================================================

alter table projects
  add column category text not null default 'general'
  check (category in ('general', 'logo', 'branding', 'social', 'packaging', 'print', 'uiux'));

comment on column projects.category is
  'Design discipline grouping for the member''s Work section — general is the default for non-design categories (web/app/marketing).';

create index projects_category_idx on projects(category);
