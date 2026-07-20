export default function PricingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-zinc-950">
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
        Pricing Plans
      </h1>
      <p className="max-w-2xl text-zinc-400 text-lg mb-8">
        Choose the plan that fits your developer career level. From hobby
        projects to full-time freelancing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full mx-auto text-left">
        {/* Hobby Plan */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-2">Hobby</h3>
          <p className="text-zinc-400 text-sm mb-4">
            Perfect for showing client-side portfolios.
          </p>
          <div className="text-3xl font-extrabold text-white mb-6">
            $0{" "}
            <span className="text-zinc-500 text-sm font-normal">/ month</span>
          </div>
          <ul className="space-y-3 text-zinc-400 text-sm mb-8">
            <li className="flex items-center gap-2">
              ✓ 1 Active Portfolio Page
            </li>
            <li className="flex items-center gap-2">✓ Dynamic Feedback Wall</li>
            <li className="flex items-center gap-2">✗ Custom Domain Rewrite</li>
          </ul>
          <button className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 font-semibold text-white transition-colors">
            Get Started
          </button>
        </div>

        {/* Pro Plan */}
        <div className="p-6 rounded-2xl border border-purple-500/30 bg-purple-950/10 backdrop-blur-sm relative">
          <div className="absolute top-0 right-6 -translate-y-1/2 bg-purple-650 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
            Popular
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Developer Pro</h3>
          <p className="text-zinc-400 text-sm mb-4">
            For self-employed and senior contract developers.
          </p>
          <div className="text-3xl font-extrabold text-white mb-6">
            $12{" "}
            <span className="text-zinc-500 text-sm font-normal">/ month</span>
          </div>
          <ul className="space-y-3 text-zinc-400 text-sm mb-8">
            <li className="flex items-center gap-2">✓ Unlimited Portfolios</li>
            <li className="flex items-center gap-2">
              ✓ Verified Professional Feedback
            </li>
            <li className="flex items-center gap-2">
              ✓ Custom Subdomain & Rewrites
            </li>
          </ul>
          <button className="w-full py-2.5 rounded-xl bg-purple-650 hover:bg-purple-600 font-semibold text-white shadow-lg shadow-purple-500/25 transition-all">
            Unlock Pro
          </button>
        </div>
      </div>
    </div>
  );
}
