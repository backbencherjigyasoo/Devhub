import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DevHub - The Ultimate Developer Portfolio Builder",
  description:
    "Create, customize, and share your developer portfolio website with dynamic feedback walls and built-in analytics.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50 font-sans selection:bg-purple-500/30 selection:text-purple-200">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 group">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-purple-500/25 transition-transform group-hover:scale-105">
                  D
                </span>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
                  DevHub
                </span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/"
                  className="text-sm font-medium text-zinc-400 hover:text-zinc-55 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/pricing"
                  className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors"
                >
                  Pricing
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="rounded-full bg-gradient-to-r from-purple-650 to-indigo-650 hover:from-purple-600 hover:to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-purple-600/30 transition-all hover:scale-[1.02]"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">{children}</main>

        {/* Footer */}
        <footer className="border-t border-zinc-900 bg-black py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tight text-zinc-400">
                DevHub
              </span>
              <span className="text-sm text-zinc-600">
                © 2026. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <Link
                href="/about"
                className="hover:text-zinc-300 transition-colors"
              >
                About
              </Link>
              <Link
                href="/pricing"
                className="hover:text-zinc-300 transition-colors"
              >
                Pricing
              </Link>
              <a href="#" className="hover:text-zinc-300 transition-colors">
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-zinc-300 transition-colors font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                Documentation
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
