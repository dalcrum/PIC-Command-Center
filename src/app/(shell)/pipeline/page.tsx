export default function PipelinePage() {
  const stages = ["Lead", "Qualified", "Proposal", "Negotiation", "Closed Won"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pipeline</h1>
          <p className="text-text-muted mt-1">
            Track your deals from lead to close.
          </p>
        </div>
        <button className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors">
          + Add Deal
        </button>
      </div>

      {/* Kanban-style pipeline */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <div
            key={stage}
            className="flex-shrink-0 w-64 bg-card-bg border border-border-color rounded-xl"
          >
            <div className="p-4 border-b border-border-color">
              <h3 className="text-sm font-semibold text-foreground">{stage}</h3>
              <p className="text-xs text-text-muted mt-0.5">$0 — 0 deals</p>
            </div>
            <div className="p-4 min-h-[200px] flex items-center justify-center">
              <p className="text-xs text-text-muted">Drop deals here</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
