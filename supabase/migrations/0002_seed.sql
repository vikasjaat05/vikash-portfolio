-- ============================================================
-- Seed data — mirrors today's static src/data/founders.ts and
-- src/data/portfolio.ts exactly, so the site looks identical on
-- day one of switching to Supabase-backed reads.
--
-- PINs are hashed with pgcrypto's bcrypt-compatible crypt().
-- Real PINs used here (change these later via the admin panel):
--   Admin:            8185
--   Vikash Choudhary: 5311
--   Yunus Ali:        0716
--   Chandra Prakash:  2540
-- ============================================================

-- ---------- Admin ----------
insert into admins (label, pin_hash)
values ('Admin', crypt('8185', gen_salt('bf')));

-- ---------- Team members ----------
insert into team_members (slug, pin_hash, published_data, published_at)
values
(
  'vikash-choudhary',
  crypt('5311', gen_salt('bf')),
  jsonb_build_object(
    'name', 'Vikash Choudhary',
    'role', 'Web & Shopify Developer',
    'initials', 'VC',
    'focus', 'Web & Shopify',
    'categorySlug', 'web',
    'bio', 'Builds fast, scalable websites and Shopify stores — from custom themes to full headless commerce builds.',
    'longBio', E'Vikash leads every web and Shopify build at Arix Team — from the first line of code to the last performance audit before launch. He specializes in fast, conversion-focused storefronts and custom web applications built on modern stacks like Next.js, with a strong focus on Core Web Vitals and real-world checkout performance.\n\nHe works closely with founders and marketing teams to turn rough briefs into shippable, revenue-driving builds — pairing clean architecture with pixel-level attention on the front end so sites feel as fast as they look.',
    'highlights', jsonb_build_array(
      'Leads all Web & Shopify projects end-to-end, from architecture to launch',
      'Specializes in Core Web Vitals and checkout conversion performance',
      'Ships on modern stacks — Next.js, headless CMS, custom Shopify themes'
    ),
    'skills', jsonb_build_array('Next.js', 'Shopify', 'E-commerce', 'Web Apps'),
    'stats', jsonb_build_array(
      jsonb_build_object('value', 8, 'suffix', '+', 'label', 'Years Experience'),
      jsonb_build_object('value', 40, 'suffix', '+', 'label', 'Sites Shipped'),
      jsonb_build_object('value', 97, 'suffix', '%', 'label', 'Client Retention')
    ),
    'gradient', 'linear-gradient(160deg, #1a1a1a 0%, #e10600 140%)',
    'avatar', 'https://res.cloudinary.com/dh0amtajw/image/upload/v1783076813/ChatGPT_Image_Jul_3_2026_12_25_31_PM_t7giml.png'
  ),
  now()
),
(
  'yunus-ali',
  crypt('0716', gen_salt('bf')),
  jsonb_build_object(
    'name', 'Yunus Ali',
    'role', 'Digital Marketing & WordPress Developer',
    'initials', 'YA',
    'focus', 'Digital Marketing',
    'categorySlug', 'marketing',
    'bio', 'Runs performance and growth campaigns across paid, SEO and social, and builds WordPress sites that convert.',
    'longBio', E'Yunus runs every marketing engagement at Arix Team — planning and executing paid, SEO and social campaigns that turn ad spend into pipeline. He also builds and maintains WordPress sites for clients who need a content-first platform their own team can manage day to day.\n\nHis approach blends data and creative: every campaign ships with clear tracking from click to conversion, so budget keeps moving toward what''s actually working instead of what looks good on a dashboard.',
    'highlights', jsonb_build_array(
      'Plans and runs paid, SEO and social campaigns across every channel',
      'Builds and maintains content-first WordPress sites for clients',
      'Ties every campaign to measurable pipeline, not vanity metrics'
    ),
    'skills', jsonb_build_array('SEO', 'Paid Ads', 'WordPress', 'CRO'),
    'stats', jsonb_build_array(
      jsonb_build_object('value', 6, 'suffix', '+', 'label', 'Years Experience'),
      jsonb_build_object('value', 55, 'suffix', '+', 'label', 'Campaigns Run'),
      jsonb_build_object('value', 3, 'suffix', 'x', 'label', 'Avg. ROAS')
    ),
    'gradient', 'linear-gradient(160deg, #1a1a1a 0%, #f4a300 140%)',
    'avatar', 'https://res.cloudinary.com/dh0amtajw/image/upload/v1783090235/ChatGPT_Image_Jul_3_2026_08_20_17_PM_ex1ovd.png'
  ),
  now()
),
(
  'chandra-prakash',
  crypt('2540', gen_salt('bf')),
  jsonb_build_object(
    'name', 'Chandra Prakash',
    'role', 'Graphic Designer',
    'initials', 'CP',
    'focus', 'Graphic Design',
    'categorySlug', 'graphics',
    'bio', 'Crafts brand identities and visual systems that make businesses unmistakable across every touchpoint.',
    'longBio', E'Chandra leads brand and visual design at Arix Team — building identity systems, packaging, and motion work that make client brands instantly recognizable. Every project starts with a documented system, not just a one-off asset, so brands stay consistent long after the first delivery.\n\nFrom logo marks to full packaging rollouts, every deliverable is built to hold up across print, digital, and motion — so a brand looks like itself everywhere a customer finds it.',
    'highlights', jsonb_build_array(
      'Leads brand identity, packaging and motion design at Arix Team',
      'Delivers full documented brand systems, not one-off assets',
      'Designs consistently across print, digital and motion formats'
    ),
    'skills', jsonb_build_array('Branding', 'UI/UX', 'Print', 'Motion'),
    'stats', jsonb_build_array(
      jsonb_build_object('value', 7, 'suffix', '+', 'label', 'Years Experience'),
      jsonb_build_object('value', 65, 'suffix', '+', 'label', 'Brands Designed'),
      jsonb_build_object('value', 12, 'suffix', '', 'label', 'Design Awards')
    ),
    'gradient', 'linear-gradient(160deg, #1a1a1a 0%, #7a3ee0 140%)',
    'avatar', 'https://res.cloudinary.com/dh0amtajw/image/upload/v1783076814/ChatGPT_Image_Jul_3_2026_01_07_48_PM_bykrat.png'
  ),
  now()
);

-- ---------- Projects: Vikash (web) ----------
insert into projects (member_id, slug, status, draft_title, draft_description, draft_link_url,
                       published_title, published_description, published_link_url, published_at)
select id, v.slug, 'published', v.title, v.description, null, v.title, v.description, null, now()
from team_members, (values
  ('lumen-finance', 'Lumen Finance', 'A fintech marketing site and client dashboard built for speed and trust.'),
  ('vertex-saas-platform', 'Vertex SaaS Platform', 'Full SaaS web app with billing, onboarding and a real-time analytics suite.'),
  ('kindred-foods-store', 'Kindred Foods Store', 'A high-converting Shopify storefront with custom sections and subscription checkout.'),
  ('halo-health-portal', 'Halo Health Portal', 'Patient-facing booking portal integrated with an existing clinic CRM.')
) as v(slug, title, description)
where team_members.slug = 'vikash-choudhary';

-- ---------- Projects: Yunus (marketing) ----------
insert into projects (member_id, slug, status, draft_title, draft_description, draft_link_url,
                       published_title, published_description, published_link_url, published_at)
select id, v.slug, 'published', v.title, v.description, null, v.title, v.description, null, now()
from team_members, (values
  ('pulse-growth-campaign', 'Pulse Growth Campaign', 'A full-funnel paid and organic campaign that doubled qualified leads in one quarter.'),
  ('vertex-launch-push', 'Vertex Launch Push', 'Go-to-market campaign for a new SaaS tier, spanning content, email and paid social.'),
  ('nova-retail-always-on', 'Nova Retail Always-On', 'Ongoing performance marketing retainer optimizing CAC across paid channels.')
) as v(slug, title, description)
where team_members.slug = 'yunus-ali';

-- ---------- Projects: Chandra (graphics) ----------
insert into projects (member_id, slug, status, draft_title, draft_description, draft_link_url,
                       published_title, published_description, published_link_url, published_at)
select id, v.slug, 'published', v.title, v.description, null, v.title, v.description, null, now()
from team_members, (values
  ('orbit-rebrand', 'Orbit Rebrand', 'A full identity overhaul — logo system, type, color and brand guidelines.'),
  ('kindred-packaging', 'Kindred Packaging', 'Packaging and label system for a nationwide organic food rollout.'),
  ('halo-motion-kit', 'Halo Motion Kit', 'A motion graphics kit used across product explainer and social content.')
) as v(slug, title, description)
where team_members.slug = 'chandra-prakash';
