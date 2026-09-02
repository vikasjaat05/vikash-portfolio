# 🚀 AI Master Prompt Blueprint (Generic Template)

> **Note:** Fill in the placeholders (marked with `[YOUR_...]`) with your specific project details before sharing or prompting an AI assistant. This template contains zero personal or sensitive data.

---

## 1. Project Overview & Objective

- **Project Name:** `[YOUR_PROJECT_NAME]`
- **Goal / Purpose:** `[Brief 1-2 sentence description of what you are building and why]`
- **Target Audience:** `[e.g., End users, Agency clients, Developers, Businesses]`
- **Core Value Proposition:** `[e.g., High performance, seamless UX, modern design, scalable backend]`

---

## 2. AI Persona & Role

Act as a **Senior Full-Stack Engineer & Lead Product Designer** specializing in modern web applications. Your response must prioritize:
- Clean, modular, and maintainable production-grade code.
- Premium, high-converting visual UI/UX aesthetics.
- SEO best practices, accessibility (a11y), and responsive performance.

---

## 3. Technology Stack & Environment

- **Frontend Framework:** `[e.g., Next.js (App Router) / React / Vite]`
- **Language:** `[e.g., TypeScript / JavaScript]`
- **Styling:** `[e.g., Tailwind CSS / Vanilla CSS / CSS Modules]`
- **State Management:** `[e.g., Zustand / React Context / Redux]`
- **Database / Backend:** `[e.g., Supabase / Firebase / Node.js Express / PostgreSQL]`
- **Authentication:** `[e.g., Supabase Auth / NextAuth / Clerk]`
- **Deployment Platform:** `[e.g., Vercel / Netlify / AWS]`

---

## 4. Design System & UX Standards

### 🎨 Visual Theme
- **Color Palette:**
  - Primary Accent: `[e.g., #0052FF]`
  - Background: `[e.g., #0A0A0A (Dark) / #FAFAFA (Light)]`
  - Text Colors: `[e.g., #FFFFFF (Primary) / #A1A1AA (Muted)]`
  - Border & Glassmorphism: `[e.g., rgba(255, 255, 255, 0.1)]`
- **Typography:** `[e.g., Inter, Outfit, Syne, Roboto]`
- **Design Vibe:** Modern, minimalist, high-tech, micro-animations, fast transitions.

---

## 5. Core Feature Specifications

### 🔹 Feature 1: `[FEATURE_NAME_1]`
- **Description:** `[What this feature does]`
- **Key Actions:**
  - `[User Action 1]`
  - `[User Action 2]`
- **Acceptance Criteria:** `[How to confirm it is working correctly]`

### 🔹 Feature 2: `[FEATURE_NAME_2]`
- **Description:** `[What this feature does]`
- **Key Actions:**
  - `[User Action 1]`
  - `[User Action 2]`
- **Acceptance Criteria:** `[How to confirm it is working correctly]`

---

## 6. Data Model / Schema (If Applicable)

```typescript
// Define key data types or database entities here
export interface [YOUR_ENTITY_NAME] {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string;
  status: "[DRAFT]" | "[PUBLISHED]";
}
```

---

## 7. Strict Constraints & Development Rules

1. **No Placeholders:** Provide complete, runnable code rather than mock placeholders like `// TODO: implement later`.
2. **Security First:** Never hardcode secret keys, passwords, or personal credentials. Use environment variables (`process.env.NEXT_PUBLIC_...`).
3. **Error Handling:** Include robust error states, loading skeletons, and edge-case handling.
4. **Responsive Layouts:** Mobile-first design that seamlessly scales to tablet and desktop.
5. **Clean Architecture:** Keep components focused, single-responsibility, and reusable.

---

## 8. Expected Output Structure

When executing this prompt, please provide:
1. **File Structure Tree:** Logical directory organization.
2. **Code Implementation:** File-by-file production code with clear inline explanations.
3. **Verification Step:** How to run, test, and verify the feature locally.
