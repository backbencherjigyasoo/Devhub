"use client";

import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import ResumeUploader from "@/components/ResumeUploader";
import PortfolioPreview from "@/components/PortfolioPreview";
import { savePortfolioAction } from "@/app/actions/portfolio";
import { categorizeSkills } from "@/lib/skillsCategorizer";

export default function BuilderPage() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    headline: "",
    email: "",
    github: "",
    linkedin: "",
    bio: ""
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const [projects, setProjects] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState("");

  // Auto-fill from resume parser
  const handleAutoFill = (data) => {
    if (data.name) {
      setProfile((prev) => ({
        ...prev,
        name: data.name,
        headline: data.headline || prev.headline,
        email: data.email || prev.email,
        github: data.github || prev.github,
        linkedin: data.linkedin || prev.linkedin,
        bio: data.bio || prev.bio
      }));
      // Auto-generate clean username from name
      const cleanHandle = data.name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
      setUsername(cleanHandle);
    }
    if (data.skills?.length) {
      setSkills(data.skills);
    }
    if (data.projects?.length) {
      setProjects(data.projects);
    }
  };

  // Add / Remove Skills
  const handleAddSkill = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = skillInput.trim().replace(/^,+|,+$/g, "");
      if (trimmed && !skills.includes(trimmed)) {
        setSkills([...skills, trimmed]);
        setSkillInput("");
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Add Project
  const handleAddProject = () => {
    setProjects([
      ...projects,
      { title: "New Project", description: "Brief description of the impact and stack.", tech: "React, Node.js", link: "" }
    ]);
  };

  const handleUpdateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const handleRemoveProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const { isSignedIn, user } = useUser();
  const { openSignIn } = useClerk();

  const handlePublish = async () => {
    if (!username.trim()) {
      alert("Please choose a public handle (e.g. your-name) before publishing.");
      return;
    }
    if (!isSignedIn) {
      openSignIn();
      return;
    }

    setIsSaving(true);
    const res = await savePortfolioAction({ username, profile, skills, projects });
    setIsSaving(false);

    if (!res.success) {
      alert(res.error);
      return;
    }

    setPublishedSlug(res.username);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Portfolio Builder
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Fill in your details or upload a resume to generate your live shareable portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePublish}
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? "Saving..." : isSignedIn ? "Publish Portfolio →" : "Sign In & Publish →"}
        </button>
      </div>

      {/* Success Live Banner */}
      {publishedSlug && (
        <div className="card mb-8 border-emerald-500/40 bg-emerald-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">🎉 Portfolio is Live!</span>
              <span className="badge border-emerald-500/30 text-emerald-300 bg-emerald-500/10">Permanent Link</span>
            </div>
            <p className="text-xs text-zinc-300 mt-1">
              Your public portfolio is live at <span className="font-mono text-emerald-300">devhub.me/{publishedSlug}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/${publishedSlug}`}
              target="_blank"
              className="btn-primary py-2 px-4 text-xs font-semibold"
            >
              Open Live Page ↗
            </Link>
          </div>
        </div>
      )}

      {/* Main Grid: Form Left, Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Resume Upload Component */}
          <ResumeUploader onAutoFill={handleAutoFill} />

          {/* Section 1: Username & Profile Details */}
          <div className="card space-y-4">
            <h2 className="text-base font-semibold text-white border-b border-zinc-800 pb-2">
              1. Profile Information
            </h2>

            <div>
              <label className="input-label">Public Portfolio Handle</label>
              <div className="flex items-center rounded-lg bg-zinc-900 border border-zinc-700/80 px-3">
                <span className="text-sm text-zinc-500 font-mono">devhub.me/</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  className="w-full bg-transparent py-2 text-sm text-orange-300 font-mono focus:outline-none"
                  placeholder="your-username"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="input-field"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label className="input-label">Headline / Role</label>
                <input
                  type="text"
                  value={profile.headline}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  className="input-field"
                  placeholder="e.g. Full Stack Developer"
                />
              </div>
            </div>

            <div>
              <label className="input-label">Short Bio</label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="input-field leading-relaxed"
                placeholder="A couple of sentences about what you do and love building..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="input-label">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="input-field text-xs"
                  placeholder="name@gmail.com"
                />
              </div>
              <div>
                <label className="input-label">GitHub URL</label>
                <input
                  type="url"
                  value={profile.github}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                  className="input-field text-xs"
                  placeholder="https://github.com/..."
                />
              </div>
              <div>
                <label className="input-label">LinkedIn URL</label>
                <input
                  type="url"
                  value={profile.linkedin}
                  onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                  className="input-field text-xs"
                  placeholder="https://linkedin.com/..."
                />
              </div>
            </div>
          </div>

          {/* Section 2: Skills */}
          <div className="card space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <h2 className="text-base font-semibold text-white">
                2. Technical Skills
              </h2>
              <span className="text-xs text-zinc-400 font-mono">
                {skills.length} skills added
              </span>
            </div>

            <div>
              <label className="input-label">Add Skills (Press Enter or comma to add)</label>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                className="input-field"
                placeholder="Type skill (e.g. React, Next.js, Docker) and press Enter"
              />
            </div>

            {skills.length > 0 ? (
              <div className="space-y-3 pt-1">
                {Object.entries(categorizeSkills(skills)).map(([category, items]) => (
                  <div key={category} className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                      {category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((skill, idx) => (
                        <span key={idx} className="badge bg-zinc-800/90 text-zinc-200 gap-1.5 py-1 px-2.5 text-xs">
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-zinc-400 hover:text-red-400 font-bold ml-1 transition-colors"
                            title="Remove skill"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 italic pt-1">No skills added yet.</p>
            )}
          </div>

          {/* Section 3: Projects */}
          <div className="card space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <h2 className="text-base font-semibold text-white">
                3. Featured Projects ({projects.length})
              </h2>
              <button
                type="button"
                onClick={handleAddProject}
                className="btn-ghost text-orange-400 hover:text-orange-300"
              >
                + Add Project
              </button>
            </div>

            <div className="space-y-4">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-zinc-950/60 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => handleUpdateProject(idx, "title", e.target.value)}
                      className="input-field font-semibold text-white"
                      placeholder="Project Title"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(idx)}
                      className="btn-ghost text-red-400 hover:text-red-300 shrink-0"
                    >
                      Delete
                    </button>
                  </div>

                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => handleUpdateProject(idx, "description", e.target.value)}
                    className="input-field text-xs"
                    placeholder="Short description of what you built and problem solved..."
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={proj.tech}
                      onChange={(e) => handleUpdateProject(idx, "tech", e.target.value)}
                      className="input-field text-xs font-mono"
                      placeholder="Tech stack (e.g. Next.js, Node.js)"
                    />
                    <input
                      type="url"
                      value={proj.link}
                      onChange={(e) => handleUpdateProject(idx, "link", e.target.value)}
                      className="input-field text-xs"
                      placeholder="Live URL / GitHub Repo"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Portfolio Preview (5 cols) */}
        <div className="lg:col-span-5">
          <PortfolioPreview
            profile={profile}
            skills={skills}
            projects={projects}
            username={username}
          />
        </div>
      </div>
    </div>
  );
}
