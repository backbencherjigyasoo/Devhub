"use client";

import { categorizeSkills } from "@/lib/skillsCategorizer";

export default function PortfolioPreview({ profile, skills, projects, username }) {
  const initials = profile.name
    ? profile.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "DH";

  return (
    <div className="card sticky top-24 border-zinc-800 bg-zinc-900/90 shadow-2xl">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs font-mono text-zinc-400">
            devhub.me/{username || "your-handle"}
          </span>
        </div>
        <span className="badge text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
          Live Preview
        </span>
      </div>

      {/* Profile Body */}
      <div className="pt-6 space-y-6 max-h-[70vh] overflow-y-auto pr-1">
        {/* Hero Info */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-lg font-bold text-white shadow-lg shadow-orange-500/20">
            {initials}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {profile.name || "Your Name"}
            </h2>
            <p className="text-sm font-medium text-orange-400">
              {profile.headline || "Full Stack Developer"}
            </p>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              {profile.bio || "Add a short bio about your passions, tech stack, and background."}
            </p>
          </div>
        </div>

        {/* Social Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="badge hover:border-zinc-500 hover:text-white transition-colors"
            >
              GitHub ↗
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="badge hover:border-zinc-500 hover:text-white transition-colors"
            >
              LinkedIn ↗
            </a>
          )}
          {profile.email && (
            <span className="badge text-zinc-400">
              ✉ {profile.email}
            </span>
          )}
        </div>

        {/* Skills Section (Categorized) */}
        <div>
          <h3 className="input-label mb-2">Technical Skills</h3>
          {skills.length > 0 ? (
            <div className="space-y-2.5">
              {Object.entries(categorizeSkills(skills)).map(([category, items]) => (
                <div key={category} className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                    {category}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {items.map((skill, idx) => (
                      <span key={idx} className="badge bg-zinc-800/90 text-zinc-200 text-[11px] py-0.5 px-2">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-500 italic">No skills added yet.</p>
          )}
        </div>

        {/* Projects Section */}
        <div>
          <h3 className="input-label mb-2">Featured Projects</h3>
          <div className="space-y-3">
            {projects.length > 0 ? (
              projects.map((proj, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-zinc-100">{proj.title || "Untitled Project"}</h4>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-orange-400 hover:underline">
                        Visit ↗
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">{proj.description}</p>
                  {proj.tech && (
                    <div className="mt-2 text-[10px] text-zinc-400 font-mono">
                      Tech: {proj.tech}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-zinc-500 italic">No projects added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
