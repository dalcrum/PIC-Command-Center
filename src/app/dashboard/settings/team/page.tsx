export default function TeamSettingsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Team Management</h1>
          <p className="text-text-secondary text-sm mt-1">Manage team members, roles, and module access</p>
        </div>
        <button className="px-4 py-2 bg-cta-bg text-cta-text text-sm font-bold uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity">
          Invite Member
        </button>
      </div>

      <div className="bg-bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-5 py-3">Name</th>
              <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-5 py-3">Role</th>
              <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-5 py-3">Modules</th>
              <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-pic-blue flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">DC</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Dallas Crum</p>
                    <p className="text-xs text-text-muted">dallas@proudimpact.com</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3 text-xs font-semibold text-accent">Admin</td>
              <td className="px-5 py-3 text-xs text-text-secondary">All modules</td>
              <td className="px-5 py-3">
                <span className="inline-flex items-center gap-1 text-xs text-success">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  Active
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
