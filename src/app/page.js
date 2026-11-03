import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-zinc-950 text-zinc-50">
      {/* ─── Hero Section ─────────────────────────────────────────── */}
      <section className="relative text-center px-4 py-28 overflow-hidden">
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 h-[500px] w-[500px] rounded-full bg-orange-600/15 blur-3xl" />

        <div className="relative section-container">
          {/* Badge */}
          <div className="badge mb-6 py-1 px-4 text-orange-300 border-orange-500/30 bg-orange-500/10 gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
            Instant Developer Portfolio Builder
          </div>

          {/* Heading */}
          <h1 className="hero-heading">
            Turn Your Resume Into a{" "}
            <span className="gradient-text">Live Developer Portfolio</span>
          </h1>

          <p className="hero-subtitle">
            Upload your resume or paste its text. DevHub instantly extracts your skills,
            projects, and experience into a permanent, shareable portfolio page.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/builder" className="btn-primary py-3 px-7 text-sm font-semibold">
              Build Portfolio Free →
            </Link>
            <Link href="/builder" className="btn-secondary py-3 px-7 text-sm">
              Upload Resume
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Features Section ─────────────────────────────────────── */}
      <section className="py-20 border-t border-zinc-900 bg-zinc-950">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Simple, Fast & Meaningful
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              No complicated setups. Just your work, beautifully organized.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item) => (
              <div key={item.title} className="feature-card">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="text-base font-semibold text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ───────────────────────────────────────────── */}
      <section className="py-24 text-center border-t border-zinc-900 bg-zinc-900/20">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Ready to publish your portfolio?
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            Takes under 2 minutes. Get a permanent public URL to share on LinkedIn and resumes.
          </p>
          <div className="mt-6">
            <Link href="/builder" className="btn-primary py-3 px-8 text-sm font-semibold">
              Start in Builder Now →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────

const features = [
  {
    icon: "📄",
    title: "Instant Resume Extraction",
    desc: "Drop your PDF or paste resume text. It auto-fills your bio, skills, and projects in seconds.",
  },
  {
    icon: "⚡",
    title: "Real-time Live Preview",
    desc: "See every change as you type with a side-by-side reactive preview window.",
  },
  {
    icon: "🔗",
    title: "Permanent Public URL",
    desc: "Your link never expires. Share devhub.me/yourname anywhere with recruiters and clients.",
  },
  {
    icon: "🎯",
    title: "Clean Modern Design",
    desc: "Sleek dark mode typography and card layouts built specifically for software developers.",
  },
  {
    icon: "📱",
    title: "Mobile Responsive",
    desc: "Flawless rendering on phones, tablets, and wide desktop screens.",
  },
  {
    icon: "🔒",
    title: "Ownership & Easy Updates",
    desc: "Sign in with Google or GitHub anytime to update your skills and projects.",
  },
];
