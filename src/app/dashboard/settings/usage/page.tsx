export default function UsagePage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">AI Usage & Costs</h1>
        <p className="text-text-secondary text-sm mt-1">Track token usage and costs across all modules</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Tokens This Month", value: "0", sub: "No AI calls yet" },
          { label: "Cost This Month", value: "$0.00", sub: "Budget: not set" },
          { label: "Avg Cost / Day", value: "$0.00", sub: "Last 30 days" },
        ].map((card) => (
          <div key={card.label} className="bg-bg-surface border border-border rounded-xl p-5">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">{card.label}</p>
            <p className="text-2xl font-bold text-text-primary mt-2">{card.value}</p>
            <p className="text-xs text-text-secondary mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-bg-surface border border-border rounded-xl p-8 text-center">
        <svg className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
        <h3 className="text-lg font-bold text-text-primary mb-2">No usage data yet</h3>
        <p className="text-sm text-text-secondary max-w-md mx-auto">
          Usage charts will appear once module AI assistants (Kennedy, Kodiak, Chica, Boca) are active and making API calls.
        </p>
      </div>
    </div>
  );
}
