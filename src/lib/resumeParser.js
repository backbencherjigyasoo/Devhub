/**
 * Enhanced Regex & Pattern extractor for resume text.
 * Handles spaced-out uppercase headers (e.g., 'S U M M A RY', 'SE L E C TE D PR O J E C TS')
 * and project structures: Title (Tech) — Description. Link
 */

const COMMON_SKILLS = [
  "JavaScript", "TypeScript", "React", "React.js", "Next.js", "Node.js", "Express",
  "Python", "Django", "FastAPI", "Go", "Rust", "Java", "Spring Boot",
  "C++", "C#", ".NET", "PHP", "Laravel", "Ruby", "Rails",
  "HTML", "HTML5", "CSS", "CSS3", "Tailwind CSS", "Bootstrap", "Sass", "Material UI",
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Prisma",
  "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Git", "GitHub", "Jenkins", "Nginx",
  "GraphQL", "REST API", "REST APIs", "Linux", "CI/CD", "Vercel", "Firebase",
  "WebSockets", "Zustand", "Redux", "Redux Toolkit", "ApexCharts", "Jest", "RTP", "Whisper"
];

function isHeaderMatch(line, keyword) {
  if (!line) return false;
  const stripped = line.replace(/\s+/g, "").toUpperCase();
  return stripped.includes(keyword.toUpperCase());
}

export function parseResumeText(rawText) {
  if (!rawText || typeof rawText !== "string") {
    return { name: "", headline: "", email: "", github: "", linkedin: "", bio: "", skills: [], projects: [] };
  }

  const lines = rawText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  // 1. Extract Email
  const emailMatch = rawText.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  const email = emailMatch ? emailMatch[1] : "";

  // 2. Extract GitHub & LinkedIn
  const githubMatch = rawText.match(/github\.com\/([a-zA-Z0-9-]+)/i);
  const github = githubMatch ? `https://github.com/${githubMatch[1]}` : "";

  const linkedinMatch = rawText.match(/linkedin\.com\/in\/([a-zA-Z0-9-]+)/i);
  const linkedin = linkedinMatch ? `https://linkedin.com/in/${linkedinMatch[1]}` : "";

  // 3. Name (First non-empty line before email/phone)
  let name = "";
  for (const line of lines.slice(0, 3)) {
    if (!line.includes("@") && !line.includes("http") && line.length < 40 && !line.match(/\d{5,}/)) {
      name = line.replace(/^[#*\s]+/, "");
      break;
    }
  }

  // 4. Headline / Role (Usually line 2 or common titles)
  let headline = "";
  if (lines[1] && (lines[1].includes("·") || lines[1].includes("|") || lines[1].includes("-"))) {
    headline = lines[1].split(/[·|]/)[0].trim();
  }
  if (!headline) {
    const titles = [
      "Senior Frontend Engineer", "Frontend Developer", "Senior Software Engineer",
      "Full Stack Engineer", "Backend Developer", "Software Engineer", "DevOps Engineer"
    ];
    for (const title of titles) {
      if (new RegExp(title, "i").test(rawText)) {
        headline = title;
        break;
      }
    }
  }

  // 5. Skills keyword extraction
  const foundSkills = [];
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  COMMON_SKILLS.forEach((skill) => {
    const escaped = escapeRegex(skill);
    const regex = new RegExp(`(^|[^a-zA-Z0-9#+])${escaped}(?=[^a-zA-Z0-9#+]|$)`, "i");
    if (regex.test(rawText) && !foundSkills.includes(skill)) {
      // Clean up aliases (e.g. React.js -> React)
      const normalizedSkill = skill === "React.js" ? "React" : skill === "REST APIs" ? "REST API" : skill;
      if (!foundSkills.includes(normalizedSkill)) {
        foundSkills.push(normalizedSkill);
      }
    }
  });

  // 6. Bio / Summary extraction (handles 'S U M M A RY', 'SUMMARY', 'PROFILE', etc.)
  let bio = "";
  const summaryIndex = lines.findIndex((l) => isHeaderMatch(l, "SUMMARY") || isHeaderMatch(l, "PROFILE") || isHeaderMatch(l, "OBJECTIVE"));
  if (summaryIndex !== -1) {
    const bioLines = [];
    for (let i = summaryIndex + 1; i < Math.min(summaryIndex + 6, lines.length); i++) {
      if (isHeaderMatch(lines[i], "ACHIEVEMENT") || isHeaderMatch(lines[i], "SKILL") || isHeaderMatch(lines[i], "EXPERIENCE")) {
        break;
      }
      bioLines.push(lines[i]);
    }
    bio = bioLines.join(" ");
  }

  if (!bio) {
    bio = `Experienced ${headline || "Software Engineer"} passionate about building scalable, high-performance web applications.`;
  }

  // 7. Extract Projects (handles 'SE L E C TE D PR O J E C TS', 'PROJECTS', etc.)
  const projects = [];
  const projectIndex = lines.findIndex((l) => isHeaderMatch(l, "PROJECT"));

  if (projectIndex !== -1) {
    for (let i = projectIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      // Stop at next section
      if (isHeaderMatch(line, "EDUCATION") || isHeaderMatch(line, "EXPERIENCE") || isHeaderMatch(line, "CERTIFICATION")) {
        break;
      }

      // Pattern: Title (Tech) — Description or Title - Description
      const match = line.match(/^([A-Za-z0-9\s\-]+?)\s*(?:\((.*?)\))?\s*[—–-]\s*(.*)$/);
      if (match) {
        let desc = match[3] || "";
        let link = "";

        // Check for URL at the end of the description (handles subdomains like abc.vercel.app)
        const urlMatch = desc.match(/(https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)$/i);
        if (urlMatch) {
          link = urlMatch[1].startsWith("http") ? urlMatch[1] : "https://" + urlMatch[1];
          desc = desc.replace(urlMatch[0], "").trim();
        }

        // If next line is a continuation sentence
        if (
          lines[i + 1] &&
          !lines[i + 1].includes("—") &&
          !lines[i + 1].includes("–") &&
          !isHeaderMatch(lines[i + 1], "EDUCATION") &&
          !isHeaderMatch(lines[i + 1], "EXPERIENCE")
        ) {
          desc += " " + lines[i + 1];
          i++;
        }

        projects.push({
          title: match[1].trim(),
          tech: match[2] || foundSkills.slice(0, 3).join(", "),
          description: desc.trim(),
          link,
        });

        if (projects.length >= 6) break;
      }
    }
  }

  return {
    name: name || "Developer",
    headline: headline || "Software Engineer",
    email,
    github,
    linkedin,
    bio: bio.slice(0, 350),
    skills: foundSkills,
    projects,
  };
}
