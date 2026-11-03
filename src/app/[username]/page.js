import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import ShareButton from "@/components/ShareButton";
import { categorizeSkills } from "@/lib/skillsCategorizer";

export async function generateMetadata({ params }) {
  const { username } = await params;
  const portfolio = await prisma.portfolio.findUnique({
    where: { username: username.toLowerCase() },
  });

  if (!portfolio) {
    return {
      title: "Portfolio Not Found | DevHub",
    };
  }

  return {
    title: `${portfolio.name} — ${portfolio.headline || "Developer Portfolio"}`,
    description: portfolio.bio || `Explore ${portfolio.name}'s projects, skills, and experience.`,
    openGraph: {
      title: `${portfolio.name} — ${portfolio.headline || "Developer Portfolio"}`,
      description: portfolio.bio || `Explore ${portfolio.name}'s developer portfolio on DevHub.`,
      type: "profile",
    },
  };
}

export default async function PublicPortfolioPage({ params }) {
  const { username } = await params;
  const cleanUsername = username.toLowerCase();

  const portfolio = await prisma.portfolio.findUnique({
    where: { username: cleanUsername },
    include: {
      projects: {
        orderBy: { id: "asc" },
      },
    },
  });

  if (!portfolio) {
    notFound();
  }

  const initials = (portfolio.name || "D")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Top Banner & Navigation */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center font-black text-white text-xs shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              D
            </div>
            <span className="font-semibold text-sm tracking-tight text-white">DevHub</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <ShareButton username={portfolio.username} />
            <Link
              href="/builder"
              className="btn-primary text-xs py-2 px-3.5 hidden sm:inline-flex items-center gap-1.5 shadow-sm shadow-orange-500/20"
            >
              <span>Build Yours</span>
              <span className="text-orange-200">→</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Portfolio Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
        {/* Hero Section */}
        <section className="card p-8 md:p-10 border-zinc-800/80 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 flex items-center justify-center font-bold text-white text-2xl md:text-3xl shadow-xl shadow-orange-500/20 ring-4 ring-orange-500/20 shrink-0">
              {initials}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {portfolio.name}
                </h1>
                <span className="badge bg-zinc-800 text-zinc-300 border-zinc-700 font-mono text-xs">
                  @{portfolio.username}
                </span>
              </div>

              {portfolio.headline && (
                <p className="text-base md:text-lg font-medium text-orange-400">
                  {portfolio.headline}
                </p>
              )}

              {/* Social Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {portfolio.github && (
                  <a
                    href={portfolio.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                )}

                {portfolio.linkedin && (
                  <a
                    href={portfolio.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current text-sky-400" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                )}

                {portfolio.email && (
                  <a
                    href={`mailto:${portfolio.email}`}
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{portfolio.email}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* About / Bio */}
          {portfolio.bio && (
            <div className="mt-8 pt-6 border-t border-zinc-800/80">
              <h2 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">About</h2>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-normal">
                {portfolio.bio}
              </p>
            </div>
          )}
        </section>

        {/* Technical Skills (Categorized) */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>Core Technologies & Skills</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(categorizeSkills(portfolio.skills)).map(([category, items]) => (
                <div
                  key={category}
                  className="card p-4.5 bg-zinc-900/60 border-zinc-800/80 space-y-2.5"
                >
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-orange-400 flex items-center justify-between">
                    <span>{category}</span>
                    <span className="text-[10px] text-zinc-500 font-mono font-normal">({items.length})</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-lg bg-zinc-800/90 border border-zinc-700/60 text-xs md:text-sm font-medium text-zinc-200 hover:text-white hover:border-orange-500/40 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>Featured Projects ({portfolio.projects.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.projects.map((project) => (
                <div
                  key={project.id}
                  className="card p-5 border-zinc-800/80 hover:border-orange-500/40 bg-zinc-900/50 hover:bg-zinc-900/80 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                        {project.title}
                      </h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-orange-400 transition-colors p-1"
                          title="Visit live project"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>

                    {project.tech && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.split(",").map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60"
                          >
                            {t.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {project.link && (
                    <div className="pt-4 mt-2 border-t border-zinc-800/60">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                      >
                        <span>View Live Demo / Code</span>
                        <span>→</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 py-8 mt-12 bg-zinc-950 text-center text-xs text-zinc-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {portfolio.name}. Built with DevHub.</p>
          <Link
            href="/builder"
            className="text-zinc-400 hover:text-orange-400 transition-colors font-medium"
          >
            Create your free portfolio on DevHub →
          </Link>
        </div>
      </footer>
    </div>
  );
}
