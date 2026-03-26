export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Marketing</h1>
          <p className="text-text-secondary mt-1">
            Campaigns, content calendar, and analytics.
          </p>
        </div>
        <button className="px-4 py-2 bg-gold hover:bg-gold/90 text-white text-sm font-medium rounded-lg transition-colors">
          + New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5 h-48 flex items-center justify-center">
          <p className="text-text-secondary text-sm">Campaigns — coming soon</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5 h-48 flex items-center justify-center">
          <p className="text-text-secondary text-sm">Content Calendar — coming soon</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5 h-48 flex items-center justify-center">
          <p className="text-text-secondary text-sm">Email Templates — coming soon</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5 h-48 flex items-center justify-center">
          <p className="text-text-secondary text-sm">Analytics — coming soon</p>
        </div>
      </div>
    </div>
  );
}
