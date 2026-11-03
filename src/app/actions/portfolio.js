"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function savePortfolioAction(data) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "You must be signed in to publish your portfolio." };
    }

    const { username, profile, skills, projects } = data;

    // Validate username
    const cleanUsername = (username || "").toLowerCase().trim().replace(/[^a-z0-9-]/g, "");
    if (!cleanUsername || cleanUsername.length < 3) {
      return { success: false, error: "Username must be at least 3 characters (letters, numbers, hyphens only)." };
    }

    // Check if username is claimed by another user
    const existing = await prisma.portfolio.findUnique({
      where: { username: cleanUsername },
    });

    if (existing && existing.userId !== userId) {
      return { success: false, error: "This username handle is already taken. Please choose another." };
    }

    // Upsert portfolio record
    const portfolio = await prisma.portfolio.upsert({
      where: { userId },
      update: {
        username: cleanUsername,
        name: profile.name || "Developer",
        headline: profile.headline || "",
        bio: profile.bio || "",
        email: profile.email || "",
        github: profile.github || "",
        linkedin: profile.linkedin || "",
        skills: skills || [],
        projects: {
          deleteMany: {},
          create: (projects || []).map((p) => ({
            title: p.title || "Untitled Project",
            description: p.description || "",
            tech: p.tech || "",
            link: p.link || "",
          })),
        },
      },
      create: {
        userId,
        username: cleanUsername,
        name: profile.name || "Developer",
        headline: profile.headline || "",
        bio: profile.bio || "",
        email: profile.email || "",
        github: profile.github || "",
        linkedin: profile.linkedin || "",
        skills: skills || [],
        projects: {
          create: (projects || []).map((p) => ({
            title: p.title || "Untitled Project",
            description: p.description || "",
            tech: p.tech || "",
            link: p.link || "",
          })),
        },
      },
    });

    revalidatePath(`/${cleanUsername}`);
    revalidatePath("/builder");

    return { success: true, username: cleanUsername };
  } catch (error) {
    console.error("Failed to save portfolio:", error);
    return {
      success: false,
      error: error.message || "Failed to save portfolio to database. Please check your database connection.",
    };
  }
}
