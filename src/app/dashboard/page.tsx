import Link from "next/link";
import { MODULES, type ModuleId } from "@/types/modules";

const moduleOrder: ModuleId[] = ["moonshot", "orbit", "astro", "gravity"];

const kpiCards = [
  { label: "Active Clients", value: "12", change: "+2 this month", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
  { label: "Open Deals", value: "8", change: "$142K pipeline", icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" },
  { label: "GMV (30d)", value: "$24.8K", change: "+18% vs last month", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" },
  { label: "OPEX vs Budget", value: "56%", change: "Target: 35%", icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          Command Center
        </h1>
        <p className="text-text-secondary mt-1 text-sm">
          Welcome back, Dallas. Here&apos;s your business at a glance.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card) => (
          <div
            key={card.label}
            className="bg-bg-surface border border-border rounded-xl p-5 hover:border-border-strong transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                {card.label}
              </p>
              <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
              </svg>
            </div>
            <p className="text-2xl font-bold text-text-primary">{card.value}</p>
            <p className="text-xs text-text-secondary mt-1">{card.change}</p>
          </div>
        ))}
      </div>

      {/* Module Launcher Grid */}
      <div>
        <h2 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
          Modules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {moduleOrder.map((modId) => {
            const mod = MODULES[modId];
            const isLocked = mod.status === "planned";
            return (
              <Link
                key={mod.id}
                href={isLocked ? "#" : mod.href}
                className={`
                  relative bg-bg-surface border border-border rounded-xl p-5
                  transition-all duration-200 group overflow-hidden
                  ${isLocked ? "opacity-60 cursor-not-allowed" : "hover:border-border-strong hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"}
                `}
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
                  style={{ backgroundColor: mod.color }}
                />

                {/* Module dot + name */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: mod.color }}
                  />
                  <h3 className="text-base font-bold text-text-primary tracking-tight">
                    {mod.name}
                  </h3>
                  {isLocked && (
                    <svg className="w-4 h-4 text-text-muted ml-auto" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  )}
                </div>

                {/* AI name */}
                <p className="text-xs text-text-muted mb-2">
                  AI: <span style={{ color: mod.color }} className="font-semibold">{mod.aiName}</span>
                </p>

                {/* Description */}
                <p className="text-xs text-text-secondary leading-relaxed">
                  {mod.description}
                </p>

                {/* Status badge */}
                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`
                      inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full
                      ${mod.status === "live" ? "bg-success/10 text-success" : ""}
                      ${mod.status === "building" ? "bg-accent/10 text-accent" : ""}
                      ${mod.status === "planned" ? "bg-text-muted/10 text-text-muted" : ""}
                    `}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${mod.status === "live" ? "bg-success" : mod.status === "building" ? "bg-accent" : "bg-text-muted"}`} />
                    {mod.status}
                  </span>
                  {!isLocked && (
                    <svg className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Agents Tile + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Agents shortcut */}
        <Link
          href="/dashboard/agents"
          className="bg-bg-surface border border-border rounded-xl p-5 hover:border-border-strong transition-all group"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-text-primary">Paperclip AI Agents</h3>
              <p className="text-xs text-text-muted">0 active agents</p>
            </div>
            <svg className="w-4 h-4 text-text-muted ml-auto group-hover:text-text-primary transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
          <p className="text-xs text-text-secondary">
            Manage and monitor AI agents across all modules. View run history, approve checkpoints, and control deployments.
          </p>
        </Link>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-bg-surface border border-border rounded-xl p-5">
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              { action: "Platform initialized", module: "Command Center", time: "Just now" },
              { action: "Database tables created", module: "Supabase", time: "Today" },
              { action: "Auth system configured", module: "Command Center", time: "Today" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                <span className="text-text-primary">{item.action}</span>
                <span className="text-text-muted text-xs ml-auto whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-text-muted text-center">
              Full activity feed coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
