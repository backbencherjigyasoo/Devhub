# DevHub

A SaaS-style multi-tenant developer portfolio builder, built with Next.js (App Router) as a deep, hands-on exploration of advanced Next.js patterns.

## About

DevHub lets developers sign up, build a portfolio/resume site, and publish it under a dynamic profile URL. Visitors can browse projects, view details in an interactive modal, and leave feedback — while an admin dashboard gives the owner live analytics and settings.

Beyond the product idea, this project exists to deliberately implement — end to end — the hardest parts of the Next.js App Router: Server vs. Client Components, all dynamic segment types, Server Actions with React 19 hooks, parallel routes, intercepting routes, and middleware-based subdomain multi-tenancy.

## Planned Features

- 🧑‍💻 **Public developer profiles** at dynamic routes (`/user/[username]`), with both SSG and SSR rendering paths
- 🖼️ **Interactive project modals** using intercepting routes — clicking a project opens an overlay, but a direct link loads the full page
- 💬 **Visitor testimonials/feedback** powered by Server Actions, optimistic UI updates, and cache revalidation
- 📊 **Parallel-route dashboard** — analytics and settings streaming independently side by side
- 🌐 **Subdomain multi-tenancy** (e.g. `gaurav.devhub.com`) via custom middleware rewrites
- 🔒 **Authentication, SEO, and production hardening** — Auth.js/Clerk, dynamic metadata, sitemaps, and a standalone production build

## Tech Stack

- **Framework:** Next.js 14+ (App Router), TypeScript
- **Styling:** CSS
- **Rendering:** SSG, SSR, React Server Components
- **Data mutations:** Server Actions, `useActionState`, `useFormStatus`, `useOptimistic`
- **Routing:** Parallel routes, intercepting routes, middleware-based rewrites

## Project Status

🚧 **In active development.** DevHub is being built milestone by milestone, moving from static layouts through dynamic rendering, mutations, dashboards, modals, multi-tenancy, and finally production launch. Full roadmap and current progress are tracked in [`project-plan.md`](./project-plan.md) and [`road.md`](./road.md).

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Contributing

This is currently a personal project, but suggestions and feedback are welcome via Issues.

## License

This project is open source and available for personal and educational use.
