import Link from "next/link";

export default function PortfolioNotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
      <div className="card max-w-md w-full text-center p-8 border-zinc-800">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 text-2xl font-bold">
          404
        </div>
        <h1 className="text-xl font-bold text-white mb-2">Portfolio Not Found</h1>
        <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
          The developer handle you are looking for does not exist or has not been published yet.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-secondary text-xs py-2 px-4">
            Go Home
          </Link>
          <Link href="/builder" className="btn-primary text-xs py-2 px-4">
            Claim this Handle →
          </Link>
        </div>
      </div>
    </div>
  );
}
