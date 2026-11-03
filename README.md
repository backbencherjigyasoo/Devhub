# DevHub

An instant **Resume-to-Portfolio Builder** built with Next.js (App Router), React 19, and Tailwind CSS v4.

---

## 🚀 Overview

DevHub enables developers to upload their resume (or paste resume text) and immediately generate a clean, modern, responsive developer portfolio with a permanent shareable public link.

## ✨ Features

- 📄 **Instant Resume Auto-Fill**: Parses resume text and automatically extracts Name, Role, Bio, Skills, and Projects.
- ⚡ **Real-Time Live Preview**: Edit form fields on the left and see immediate changes on the right.
- 🔗 **Permanent Public URLs**: Each portfolio lives on a permanent URL (`devhub.me/[username]`).
- 🎨 **Clean Architecture**: Minimal CSS utilities via `@apply` and modular React components.
- 🔒 **User Ownership**: 1-click Google/GitHub & Email auth to claim and update portfolios.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, Tailwind CSS v4
- **ORM / Database**: Prisma, PostgreSQL (Neon) / MySQL
- **Auth**: Clerk / Auth.js (Google, GitHub, Email/Password)

## 🏃 Getting Started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) or head directly to [http://localhost:3000/builder](http://localhost:3000/builder).
