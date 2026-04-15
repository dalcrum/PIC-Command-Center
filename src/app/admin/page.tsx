export default function AdminPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Admin Panel</h1>
        <p className="text-text-secondary text-sm mt-1">User management, roles, and platform configuration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Users", count: "1", desc: "Total registered users" },
          { title: "Active Sessions", count: "1", desc: "Currently online" },
          { title: "Modules", count: "4", desc: "Moonshot, Orbit, Astro, Gravity" },
        ].map((card) => (
          <div key={card.title} className="bg-bg-surface border border-border rounded-xl p-5">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">{card.title}</p>
            <p className="text-2xl font-bold text-text-primary mt-2">{card.count}</p>
            <p className="text-xs text-text-secondary mt-1">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-bg-surface border border-border rounded-xl p-6">
        <h2 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a href="/dashboard/settings/team" className="flex items-center gap-3 p-3 rounded-lg bg-bg-primary hover:bg-bg-elevated transition-colors">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-text-primary">Invite Team Member</p>
              <p className="text-xs text-text-muted">Add users with @proudimpact.com email</p>
            </div>
          </a>
          <a href="/dashboard/settings/usage" className="flex items-center gap-3 p-3 rounded-lg bg-bg-primary hover:bg-bg-elevated transition-colors">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-text-primary">AI Usage Dashboard</p>
              <p className="text-xs text-text-muted">Monitor token costs and API usage</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
