import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-zinc-950 text-zinc-50">
      {/* ─── Hero Section ─────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-32 text-center">
        {/* Background glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 h-[600px] w-[600px] rounded-full bg-purple-600/15 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/4 h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-3xl" />

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300">
          <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
          Now live — DevHub Beta is out!
        </div>

        {/* Heading */}
        <h1 className="relative max-w-4xl text-5xl font-extrabold tracking-tight leading-tight text-white sm:text-6xl lg:text-7xl">
          Your Developer Identity,{" "}
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
            Beautifully Showcased
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-400 leading-relaxed">
          DevHub turns your projects, skills, and experience into a living,
          interactive portfolio page — complete with realtime visitor feedback,
          analytics dashboards, and custom subdomains.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-8 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-105 hover:shadow-purple-500/50"
          >
            Start building for free →
          </Link>
          <Link
            href="/about"
            className="flex h-12 items-center rounded-full border border-zinc-700 px-8 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-500 hover:text-white"
          >
            Learn more
          </Link>
        </div>

        {/* Hero image (uses Next.js <Image> with explicit width/height → stops CLS) */}
        <div className="relative mt-20 w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl shadow-black/60">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950 z-10" />
          <Image
            src="/next.svg"
            alt="DevHub portfolio preview"
            width={1200}
            height={640}
            priority
            className="w-full h-auto object-cover dark:invert opacity-5"
          />
          {/* Overlay label since we don't have a real screenshot yet */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2">
            <span className="rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-1.5 text-xs text-zinc-400 backdrop-blur-sm">
              Live Preview Coming Soon
            </span>
            <p className="text-3xl font-bold text-zinc-200">
              👨‍💻 Your Portfolio, Supercharged
            </p>
          </div>
        </div>
      </section>

      {/* ─── Features Section ─────────────────────────────────────── */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-extrabold text-white tracking-tight">
              Everything you need. Nothing you don&apos;t.
            </h2>
            <p className="mt-4 text-zinc-400 text-lg">
              Built specifically for developers who take their personal brand
              seriously.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all hover:border-zinc-600 hover:bg-zinc-900/80 hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/20 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Social Proof / Stats Strip ───────────────────────────── */}
      <section className="border-y border-zinc-900 bg-zinc-900/30 py-12 px-4">
        <div className="mx-auto max-w-5xl grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Final CTA ────────────────────────────────────────────── */}
      <section className="px-4 py-32 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Ready to own your developer brand?
          </h2>
          <p className="mt-4 text-zinc-400 text-lg">
            Join thousands of developers who use DevHub to land better jobs and
            freelance clients.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex h-13 items-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-10 text-base font-semibold text-white shadow-xl shadow-purple-600/30 transition-all hover:scale-105"
          >
            Create your DevHub page →
          </Link>
        </div>
      </section>
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────

const features = [
  {
    icon: "🚀",
    title: "Blazing Fast Pages",
    desc: "Every profile is statically generated and served from the edge. Your portfolio loads in under 100ms globally.",
  },
  {
    icon: "💬",
    title: "Realtime Feedback Wall",
    desc: "Visitors and collaborators can leave verified testimonials on your profile using Server Actions.",
  },
  {
    icon: "📊",
    title: "Analytics Dashboard",
    desc: "Track page views, unique visitors, and top-performing projects with the built-in parallel-route dashboard.",
  },
  {
    icon: "🌐",
    title: "Custom Subdomains",
    desc: "Access your portfolio at yourname.devhub.com via Next.js Middleware and dynamic URL rewrites.",
  },
  {
    icon: "🔒",
    title: "Secure by Default",
    desc: "Auth.js-powered authentication with OAuth providers. Your private settings never leave the server.",
  },
  {
    icon: "🎨",
    title: "Fully Customizable",
    desc: "Choose themes, reorder sections, and showcase the projects that matter most to your ideal employer.",
  },
];

const stats = [
  { value: "12k+", label: "Developer Profiles" },
  { value: "98%", label: "Page Speed Score" },
  { value: "40+", label: "Countries Represented" },
  { value: "<100ms", label: "Global Load Time" },
];
