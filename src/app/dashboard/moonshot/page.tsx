import { MODULES } from "@/types/modules";

const mod = MODULES.moonshot;

export default function MoonshotPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: mod.color }} />
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">{mod.name}</h1>
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider px-2 py-0.5 rounded-full bg-success/10 text-success">
          Live
        </span>
      </div>
      <p className="text-text-secondary text-sm">
        AI Assistant: <span style={{ color: mod.color }} className="font-semibold">{mod.aiName}</span> &mdash; {mod.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["Clients", "SKUs & Products", "Deals Pipeline", "Active Placements", "Sell Sheets", "Distributor Contacts"].map((section) => (
          <div key={section} className="bg-bg-surface border border-border rounded-xl p-5 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: mod.color }} />
            <h3 className="text-sm font-semibold text-text-primary mb-2">{section}</h3>
            <p className="text-xs text-text-muted">Coming with Moonshot migration</p>
          </div>
        ))}
      </div>
    </div>
  );
}
