/**
 * Universal Developer Skills Categorizer
 * Groups skills array into clean developer buckets: Frontend, Backend, Cloud & DevOps, Database, Tools & Architecture
 */

const CATEGORY_MAP = {
  "Frontend": [
    "react", "react.js", "next.js", "vue", "vue.js", "angular", "svelte", "typescript",
    "javascript", "html", "html5", "css", "css3", "tailwind css", "tailwind",
    "bootstrap", "sass", "scss", "material ui", "mui", "shadcn", "redux", "redux toolkit",
    "zustand", "context api", "chakra ui", "styled-components", "framer motion"
  ],
  "Backend & Streaming": [
    "node.js", "node", "express", "express.js", "nestjs", "python", "django", "fastapi",
    "flask", "go", "golang", "rust", "java", "spring boot", "spring", "c++", "c#", ".net",
    "php", "laravel", "ruby", "rails", "rest api", "rest apis", "restful", "graphql",
    "websockets", "websocket", "rtp", "webrtc", "grpc", "socket.io", "whisper", "kafka", "rabbitmq"
  ],
  "Cloud & DevOps": [
    "aws", "amazon web services", "azure", "gcp", "google cloud", "docker", "kubernetes",
    "k8s", "jenkins", "github actions", "gitlab ci", "ci/cd", "nginx", "terraform",
    "linux", "vercel", "netlify", "cloudflare", "git", "github"
  ],
  "Database & Storage": [
    "postgresql", "postgres", "mysql", "mongodb", "redis", "sqlite", "prisma",
    "supabase", "neon", "dynamodb", "elasticsearch", "cassandra", "firebase"
  ],
  "Testing & Performance": [
    "jest", "react testing library", "cypress", "playwright", "vitest", "mocha",
    "lighthouse", "core web vitals", "apexcharts", "d3.js", "chart.js"
  ],
};

export function categorizeSkills(skills = []) {
  if (!Array.isArray(skills) || skills.length === 0) {
    return {};
  }

  const grouped = {
    "Frontend": [],
    "Backend & Streaming": [],
    "Cloud & DevOps": [],
    "Database & Storage": [],
    "Testing & Performance": [],
    "Other Skills": [],
  };

  skills.forEach((skill) => {
    if (!skill || typeof skill !== "string") return;
    const cleanSkill = skill.trim();
    const lower = cleanSkill.toLowerCase();

    // Check if skill explicitly contains category prefix e.g. "Frontend: React"
    if (cleanSkill.includes(":")) {
      const [customCat, val] = cleanSkill.split(":");
      const trimmedCat = customCat.trim();
      const trimmedVal = val.trim();
      if (!grouped[trimmedCat]) grouped[trimmedCat] = [];
      if (!grouped[trimmedCat].includes(trimmedVal)) {
        grouped[trimmedCat].push(trimmedVal);
      }
      return;
    }

    let matched = false;
    for (const [category, keywords] of Object.entries(CATEGORY_MAP)) {
      if (keywords.some((kw) => lower === kw || lower.startsWith(kw + " ") || lower.endsWith(" " + kw))) {
        if (!grouped[category].includes(cleanSkill)) {
          grouped[category].push(cleanSkill);
        }
        matched = true;
        break;
      }
    }

    if (!matched && !grouped["Other Skills"].includes(cleanSkill)) {
      grouped["Other Skills"].push(cleanSkill);
    }
  });

  // Filter out empty categories
  const result = {};
  for (const [cat, list] of Object.entries(grouped)) {
    if (list.length > 0) {
      result[cat] = list;
    }
  }

  return result;
}
