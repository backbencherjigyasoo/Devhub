# Next.js Interview Questions — Milestone 1

## Topics: App Router, Routing, Layouts, Templates, `<Image>`, `<Link>`, `next/font`

---

## 📌 Section 1: App Router & Routing

---

**Q1. What is the difference between the Pages Router and the App Router in Next.js?**

**Answer:**

|                        | Pages Router (Legacy)                  | App Router (Modern)                   |
| ---------------------- | -------------------------------------- | ------------------------------------- |
| Directory              | `pages/`                               | `app/`                                |
| Default component type | Client Components                      | **Server Components (RSC)**           |
| Layouts                | `_app.js` (global only)                | Nested `layout.js` per segment        |
| Data fetching          | `getServerSideProps`, `getStaticProps` | `async` components + `fetch` directly |
| Streaming              | ❌ Not supported                       | ✅ Built-in via Suspense              |

The App Router is the current standard and is built on top of React Server Components.

---

**Q2. How does file-based routing work in the Next.js App Router?**

**Answer:**
Next.js maps **folder structure** inside `app/` directly to URL paths. The special file `page.js` inside a folder makes that route publicly accessible.

```
app/
├── page.js           →  /
├── about/
│   └── page.js       →  /about
└── pricing/
    └── page.js       →  /pricing
```

Only folders containing a `page.js` become accessible routes. Other special files (`layout.js`, `loading.js`, `error.js`) are **not** routes by themselves.

---

**Q3. What are the special filenames in the App Router and what does each do?**

**Answer:**

| Filename       | Purpose                                                                                                   |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| `page.js`      | The unique UI for a route. Makes a segment publicly accessible.                                           |
| `layout.js`    | Shared UI that wraps a segment and **all its children**. Does not remount on navigation.                  |
| `template.js`  | Similar to layout, but **remounts a fresh instance on every navigation**.                                 |
| `loading.js`   | Automatically wraps the page in a React `<Suspense>` boundary. Shows a skeleton/spinner while page loads. |
| `error.js`     | Catches runtime errors in its segment using React Error Boundaries.                                       |
| `not-found.js` | Renders when `notFound()` is called or no route matches.                                                  |

---

**Q4. What is a dynamic route segment in Next.js? Give an example.**

**Answer:**
A dynamic segment is a folder wrapped in square brackets `[param]`. The value is passed to the page component via the `params` prop.

```
app/user/[username]/page.js  →  /user/gaurav, /user/john, /user/any-name
```

```jsx
// app/user/[username]/page.js
export default function UserProfile({ params }) {
  return <h1>Profile of: {params.username}</h1>;
}
```

There are three types of dynamic segments:

- `[slug]` — single segment
- `[...slug]` — catch-all (matches `/a/b/c`)
- `[[...slug]]` — optional catch-all (matches `/` and `/a/b/c`)

---

## 📌 Section 2: `layout.js` vs `template.js`

---

**Q5. What is the difference between `layout.js` and `template.js`? When would you use each?**

**Answer:**

|                         | `layout.js`                            | `template.js`                                    |
| ----------------------- | -------------------------------------- | ------------------------------------------------ |
| Remounts on navigation? | ❌ No — persists across navigations    | ✅ Yes — fresh instance every navigation         |
| State preserved?        | ✅ Yes (e.g. open dropdown stays open) | ❌ No — state resets                             |
| `useEffect` re-runs?    | ❌ No                                  | ✅ Yes, on every navigation                      |
| Best for                | Navbars, sidebars, persistent shells   | Page transition animations, per-page `useEffect` |

**Use `layout.js`** when you need UI to remain alive and stateful as users navigate (e.g. a navbar, sidebar, or chat widget).

**Use `template.js`** when you need something to **re-execute on every navigation** — most commonly page entrance animations.

---

**Q6. Why can't you just put a CSS animation class directly on the `children` inside `layout.js` for page transitions?**

**Answer:**
Because `layout.js` **does not remount** on navigation. The CSS animation plays only on the very first load when the layout mounts — it never fires again on subsequent navigations between pages.

```jsx
// ❌ WRONG — animation fires ONCE only (when layout first mounts)
// app/layout.js
<main className="page-enter">{children}</main>
```

```jsx
// ✅ CORRECT — animation fires on EVERY navigation (template remounts each time)
// app/template.js
export default function Template({ children }) {
  return <div className="page-enter">{children}</div>;
}
```

**The sequence on every `<Link>` click:**

```
Click link
    │
    ▼
layout.js  → stays alive (navbar persists, no remount)
    │
    ▼
template.js → OLD instance UNMOUNTS → NEW one MOUNTS → CSS animation triggers
    │
    ▼
page.js → the new page renders inside the fresh template
```

---

**Q7. You click a `<Link>` and navigate from `/` to `/about`. What exactly happens to `layout.js` and `template.js`?**

**Answer:**

- `layout.js` — **nothing happens to it**. The same instance of RootLayout stays mounted. The navbar doesn't flicker, any open state (like a dropdown) is preserved.
- `template.js` — the old Template instance **unmounts**, and a fresh new Template instance **mounts** from scratch. This means:
  - Local `useState` resets to its initial value.
  - `useEffect` runs again.
  - CSS animation on `.page-enter` fires again from the beginning.

This is exactly why templates are ideal for page transition animations.

---

## 📌 Section 3: `<Link>` and `<Image>` Components

---

**Q8. Why should you use Next.js `<Link>` instead of a plain `<a>` tag?**

**Answer:**
A plain `<a>` tag causes a **full browser page reload** — the entire HTML, CSS, and JS is re-fetched from the server.

Next.js `<Link>` enables **client-side navigation** — only the changed page segments are fetched; the shared layout stays intact. Additionally:

- **Automatic Prefetching**: When a `<Link>` enters the viewport, Next.js silently prefetches that page in the background. By the time you click, the page is already loaded → near-instant navigation.
- **Soft navigation**: No full reload; React only replaces the changed parts of the DOM.

```jsx
// ❌ Full page reload every click
<a href="/about">About</a>;

// ✅ Instant client-side navigation + background prefetching
import Link from "next/link";
<Link href="/about">About</Link>;
```

---

**Q9. What are the performance benefits of Next.js `<Image>` over a plain `<img>` tag?**

**Answer:**

| Feature             | `<img>`                               | Next.js `<Image>`                                         |
| ------------------- | ------------------------------------- | --------------------------------------------------------- |
| Layout Shift (CLS)  | ❌ Causes shift (no size hints)       | ✅ Prevents it (explicit `width`/`height` required)       |
| Format optimization | ❌ Serves original format             | ✅ Converts to WebP/AVIF automatically by browser support |
| Lazy loading        | ❌ Must add `loading="lazy"` manually | ✅ Lazy-loads by default                                  |
| Above-fold preload  | ❌ Manual `<link rel="preload">`      | ✅ Use `priority` prop                                    |
| Responsive resizing | ❌ Manual `srcset` needed             | ✅ Automatic via `sizes` prop                             |

```jsx
// ❌ Plain img — causes Cumulative Layout Shift
<img src="/hero.png" alt="hero" />

// ✅ Next.js Image — locks the space before image loads
<Image src="/hero.png" alt="hero" width={1200} height={640} priority />
```

The `priority` prop should be used on **above-the-fold images** (visible without scrolling). It tells Next.js to inject a `<link rel="preload">` in the `<head>`, improving Largest Contentful Paint (LCP) score.

---

**Q10. What is Cumulative Layout Shift (CLS) and how does `<Image>` prevent it?**

**Answer:**
CLS is a Core Web Vitals metric that measures how much the page layout shifts unexpectedly as content loads. A common cause is images without declared dimensions — the browser allocates no space, then suddenly jumps content down when the image loads.

Next.js `<Image>` **requires** `width` and `height` props. The browser uses these to reserve the exact space before the image is fetched, so nothing shifts when it arrives.

---

**Q11. What does `next/font/google` do and why is it better than a standard Google Fonts `<link>` tag?**

**Answer:**

Standard Google Font approach (old method):

```html
<!-- Downloads font FROM Google's servers at runtime. Browser must contact Google. -->
<link
  href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
  rel="stylesheet"
/>
```

Problems:

- Extra network request to Google servers on every page load.
- Causes Flash of Unstyled Text (FOUT) — text is invisible or uses fallback font briefly.
- Privacy: sends user IP to Google.

`next/font/google` approach:

```jsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
```

At **build time**, Next.js downloads the font files and self-hosts them alongside your app. Result:

- ✅ Zero runtime network request to Google.
- ✅ Zero Layout Shift from fonts — CSS `size-adjust` is applied automatically so fallback and web font occupy the same space.
- ✅ Privacy-friendly — no data sent to Google at runtime.

---

## 📌 Quick-fire Revision

| Question                                         | Answer                                                        |
| ------------------------------------------------ | ------------------------------------------------------------- |
| Which file makes a route public?                 | `page.js`                                                     |
| Which file wraps all nested routes and persists? | `layout.js`                                                   |
| Which file remounts on every navigation?         | `template.js`                                                 |
| How do you define a dynamic route?               | `[param]` folder name                                         |
| What does `priority` do on `<Image>`?            | Injects `<link rel="preload">` for above-fold images          |
| Why use `<Link>` over `<a>`?                     | Client-side nav + automatic background prefetching            |
| What does `next/font` do at build time?          | Downloads and self-hosts fonts — no Google request at runtime |
