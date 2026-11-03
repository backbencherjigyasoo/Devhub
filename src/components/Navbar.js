"use client";

import Link from "next/link";
import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="section-container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-lg font-bold text-white shadow-lg shadow-orange-500/25 transition-transform group-hover:scale-105">
              D
            </span>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
              DevHub
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/builder"
              className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors"
            >
              Builder
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/builder" className="btn-primary py-2 px-4 text-xs font-semibold">
            Build Portfolio →
          </Link>

          {/* Clerk Core 3 Authentication Controls */}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button type="button" className="btn-secondary py-2 px-3.5 text-xs">
                Sign In
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 rounded-lg ring-1 ring-zinc-700",
                },
              }}
            />
          </Show>
        </div>
      </div>
    </header>
  );
}
