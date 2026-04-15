export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Settings</h1>
        <p className="text-text-secondary text-sm mt-1">Manage your profile and preferences</p>
      </div>

      {/* Profile section */}
      <div className="bg-bg-surface border border-border rounded-xl p-6 space-y-5">
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-widest">Profile</h2>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-pic-blue flex items-center justify-center">
            <span className="text-white text-xl font-bold">DC</span>
          </div>
          <div>
            <p className="text-base font-semibold text-text-primary">Dallas Crum</p>
            <p className="text-sm text-text-secondary">dallas@proudimpact.com</p>
            <p className="text-xs text-accent font-semibold mt-1">Admin</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-border">
          {[
            { label: "Full Name", value: "Dallas Crum" },
            { label: "Email", value: "dallas@proudimpact.com" },
            { label: "Role", value: "Admin" },
            { label: "Department", value: "Executive" },
            { label: "Timezone", value: "America/Boise" },
            { label: "Phone", value: "Not set" },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">{field.label}</label>
              <p className="text-sm text-text-primary mt-1">{field.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="/dashboard/settings/team" className="bg-bg-surface border border-border rounded-xl p-5 hover:border-border-strong transition-colors group">
          <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">Team Management</h3>
          <p className="text-xs text-text-muted mt-1">Add/remove team members, assign roles and module access</p>
        </a>
        <a href="/dashboard/settings/usage" className="bg-bg-surface border border-border rounded-xl p-5 hover:border-border-strong transition-colors group">
          <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">AI Usage & Costs</h3>
          <p className="text-xs text-text-muted mt-1">Token usage by module, cost breakdown, monthly totals</p>
        </a>
      </div>
    </div>
  );
}
