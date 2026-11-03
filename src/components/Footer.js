import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black py-8">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-zinc-400">
            DevHub
          </span>
          <span className="text-sm text-zinc-600">
            © 2026. Instant Portfolio Builder.
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <Link href="/builder" className="hover:text-zinc-300 transition-colors">
            Create Portfolio
          </Link>
          <a href="#" className="hover:text-zinc-300 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-orange-400 transition-colors">
            Documentation
          </a>
        </div>
      </div>
    </footer>
  );
}
