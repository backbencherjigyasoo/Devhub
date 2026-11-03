"use server";

import { GoogleGenAI } from "@google/genai";
import { parseResumeText as fallbackParse } from "@/lib/resumeParser";

const EXTRACTION_PROMPT = `You are an expert ATS and developer portfolio data extractor. 
Extract the following developer portfolio information into strict, valid JSON.

JSON Schema:
{
  "name": "Full Name",
  "headline": "Current or targeted engineering role (e.g. Senior Frontend Engineer)",
  "email": "email address or empty string",
  "github": "Full GitHub URL or empty string",
  "linkedin": "Full LinkedIn URL or empty string",
  "bio": "A compelling 2-3 sentence professional summary highlighting tech stack and achievements",
  "skills": ["Array", "of", "technical", "skills", "tools", "languages"],
  "projects": [
    {
      "title": "Project Name",
      "description": "Clear 1-2 sentence description of what the project does and its impact",
      "tech": "Comma-separated tech stack (e.g. Next.js, TypeScript, Zustand)",
      "link": "Live URL or GitHub link if mentioned, otherwise empty string"
    }
  ]
}
`;

export async function parseResumeWithAIAction(payload) {
  // Support both direct string (raw text) or object { text, pdfBase64 }
  const isObject = typeof payload === "object" && payload !== null;
  const rawText = isObject ? payload.text : typeof payload === "string" ? payload : "";
  const pdfBase64 = isObject ? payload.pdfBase64 : null;

  if (!rawText && !pdfBase64) {
    return { success: false, error: "No resume text or PDF file provided." };
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // If no Gemini API key configured
  if (!apiKey) {
    if (pdfBase64) {
      return {
        success: false,
        error: "PDF upload requires Gemini API Key. Please use 'Paste Text' or add GEMINI_API_KEY.",
      };
    }
    const data = fallbackParse(rawText);
    return { success: true, data, source: "local" };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const contents = [];
    if (pdfBase64) {
      contents.push({
        inlineData: {
          mimeType: "application/pdf",
          data: pdfBase64,
        },
      });
      contents.push({
        text: `${EXTRACTION_PROMPT}\nExtract all details from the attached PDF resume.`,
      });
    } else {
      contents.push({
        text: `${EXTRACTION_PROMPT}\nResume Content:\n${rawText}`,
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsedData = JSON.parse(response.text);
    return { success: true, data: parsedData, source: "gemini-ai" };
  } catch (error) {
    console.error("Gemini AI extraction error:", error);
    if (rawText) {
      const data = fallbackParse(rawText);
      return { success: true, data, source: "local" };
    }
    return { success: false, error: "Failed to extract data from PDF: " + (error?.message || "Unknown error") };
  }
}
