export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary mt-1">
          Welcome back, Dallas. Here&apos;s your business at a glance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Contacts", value: "0", change: "+0 this week" },
          { label: "Active Deals", value: "0", change: "$0 pipeline" },
          { label: "Open Projects", value: "0", change: "0 due soon" },
          { label: "Revenue MTD", value: "$0", change: "+0% vs last month" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-surface border border-border rounded-xl p-5"
          >
            <p className="text-sm text-text-secondary">{stat.label}</p>
            <p className="text-2xl font-bold text-text-primary mt-1">
              {stat.value}
            </p>
            <p className="text-xs text-text-secondary mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Placeholder sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5 h-64 flex items-center justify-center">
          <p className="text-text-secondary text-sm">Recent Activity — coming soon</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5 h-64 flex items-center justify-center">
          <p className="text-text-secondary text-sm">Upcoming Tasks — coming soon</p>
        </div>
      </div>
    </div>
  );
}
