export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-text-muted mt-1">
          Manage your account, integrations, and preferences.
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            title: "Profile",
            description: "Update your name, email, and avatar",
          },
          {
            title: "Integrations",
            description: "Connect Moonshot, email, calendar, and other tools",
          },
          {
            title: "Team",
            description: "Invite members and manage permissions",
          },
          {
            title: "Notifications",
            description: "Configure email and in-app notifications",
          },
          {
            title: "Billing",
            description: "Manage your subscription and payment methods",
          },
        ].map((section) => (
          <div
            key={section.title}
            className="bg-card-bg border border-border-color rounded-xl p-5 flex items-center justify-between hover:border-accent/50 transition-colors cursor-pointer"
          >
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {section.title}
              </h3>
              <p className="text-sm text-text-muted mt-0.5">
                {section.description}
              </p>
            </div>
            <svg
              className="w-5 h-5 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
