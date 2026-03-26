export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Marketing</h1>
          <p className="text-text-muted mt-1">
            Campaigns, content calendar, and analytics.
          </p>
        </div>
        <button className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors">
          + New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card-bg border border-border-color rounded-xl p-5 h-48 flex items-center justify-center">
          <p className="text-text-muted text-sm">Campaigns — coming soon</p>
        </div>
        <div className="bg-card-bg border border-border-color rounded-xl p-5 h-48 flex items-center justify-center">
          <p className="text-text-muted text-sm">Content Calendar — coming soon</p>
        </div>
        <div className="bg-card-bg border border-border-color rounded-xl p-5 h-48 flex items-center justify-center">
          <p className="text-text-muted text-sm">Email Templates — coming soon</p>
        </div>
        <div className="bg-card-bg border border-border-color rounded-xl p-5 h-48 flex items-center justify-center">
          <p className="text-text-muted text-sm">Analytics — coming soon</p>
        </div>
      </div>
    </div>
  );
}
