"use client";

import { useState } from "react";
import { parseResumeWithAIAction } from "@/app/actions/aiResumeParser";

export default function ResumeUploader({ onAutoFill }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pasteText, setPasteText] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      let payload;

      if (isPdf) {
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        payload = { pdfBase64: base64 };
      } else {
        const text = await file.text();
        payload = { text };
      }

      const res = await parseResumeWithAIAction(payload);
      if (res.success && res.data) {
        onAutoFill(res.data);
      } else {
        alert(res.error || "Could not parse resume data.");
      }
    } catch {
      alert("Error reading file. Please try pasting the resume text instead.");
    } finally {
      setIsProcessing(false);
      // Reset input so same file can be re-uploaded if desired
      e.target.value = "";
    }
  };

  const handlePasteSubmit = async (e) => {
    e.preventDefault();
    if (!pasteText.trim()) return;

    setIsProcessing(true);
    const res = await parseResumeWithAIAction({ text: pasteText });
    setIsProcessing(false);

    if (res.success && res.data) {
      onAutoFill(res.data);
      setShowPasteModal(false);
      setPasteText("");
    } else {
      alert(res.error || "Failed to extract resume data.");
    }
  };

  return (
    <>
      <div className="card border-orange-500/30 bg-orange-950/20 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-white">✨ Instant Resume Auto-Fill</span>
              <span className="badge bg-orange-500/20 text-orange-300 border-orange-500/40">AI Ready</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Upload your resume (.txt, .md, .pdf) or paste resume text to auto-fill the entire form.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <label className="btn-primary cursor-pointer text-xs py-2 px-3.5">
              {isProcessing ? "Extracting..." : "Upload Resume"}
              <input
                type="file"
                accept=".txt,.md,.pdf,.json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={() => setShowPasteModal(true)}
              className="btn-secondary text-xs py-2 px-3.5"
            >
              Paste Text
            </button>
          </div>
        </div>
      </div>

      {/* Paste Modal: Outside .card so fixed position and z-index cover the whole screen */}
      {showPasteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-zinc-900 border border-zinc-700 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-white">Paste Resume Text</h3>
              <button
                type="button"
                onClick={() => setShowPasteModal(false)}
                className="text-zinc-400 hover:text-white text-lg font-bold px-1"
              >
                ×
              </button>
            </div>
            <p className="text-xs text-zinc-400 mb-4">
              Copy the text from your resume or LinkedIn profile and paste it below:
            </p>
            <form onSubmit={handlePasteSubmit}>
              <textarea
                rows={9}
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder="Paste resume content here..."
                className="input-field font-mono text-xs mb-4"
                required
              />
              <div className="flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowPasteModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs py-2 px-4">
                  Extract & Auto-Fill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
