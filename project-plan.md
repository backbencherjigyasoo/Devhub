# DevHub: Instant Resume-to-Portfolio Builder

A simple, meaningful platform: **Upload your resume -> Generate an instant portfolio -> Share a permanent, live link.**

---

## 🎯 Core Architecture & Principles
- **Clean Styling Standards**: No messy inline Tailwind class soup; use modular UI components and `@apply` classes in `globals.css` for clean, readable JSX.
- **Authentication**: 1-click Google / GitHub + Email/Password auth to claim usernames and edit portfolios later.
- **Resume Auto-Fill**: Resume upload with keyword/AI extraction to pre-fill the form in seconds.
- **Permanent Storage**: Relational cloud DB (PostgreSQL / MySQL via Prisma ORM) so shared links never expire.
- **Permanent Public URL (`/[username]`)**: High-performance SSR/ISR public portfolio page.

---

## 🗺️ Step-by-Step Roadmap

### Phase 1: Clean Design System & Builder UI (`/builder`)
- [x] Define clean base utility classes (`.btn-primary`, `.card`, `.input-field`) in `globals.css` using `@apply`.
- [x] Build `/builder` route with clean, readable JSX components (`<ProfileForm>`, `<SkillsInput>`, `<ProjectCard>`).
- [x] Resume upload button with keyword extraction to auto-fill form inputs.
- [x] Real-time portfolio live preview side-by-side.

### Phase 2: Authentication System (Login/Signup)
- [x] Setup Auth (Clerk) with Google, GitHub, and Email/Password support.
- [x] Protected edit flow: Allow anonymous preview, require login on "Publish & Claim URL".
- [x] Associate portfolio record with user ID.

### Phase 3: Permanent Database & Server Actions (Prisma ORM)
- [x] Setup Prisma schema (`Portfolio`, `Project` linked with Clerk `userId`).
- [x] Setup Prisma Singleton Client for Next.js (`src/lib/prisma.js`).
- [x] Server Action (`savePortfolioAction`) to validate and save portfolio with data persistence.
- [x] Connect live database URL in `.env.local` (Neon Postgres).

### Phase 4: Public Portfolio View (`/[username]`) & Sharing
- [x] Dynamic Server Component route: `app/[username]/page.js`.
- [x] Clean, aesthetic portfolio layout with dark/light theme support.
- [x] 1-click "Copy Share Link" and "Download PDF" features.
- [x] Dynamic OpenGraph metadata for rich social link previews.

### Phase 5: Production Hardening & Vercel Deploy
- [x] Vercel deployment with environment variables.
- [x] Permanent custom domain mapping (optional).
