import { MODULES } from "@/types/modules";

const mod = MODULES.orbit;

export default function OrbitPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: mod.color }} />
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">{mod.name}</h1>
        <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-text-muted/10 text-text-muted">
          Planned
        </span>
      </div>
      <p className="text-text-secondary text-sm">
        AI Assistant: <span style={{ color: mod.color }} className="font-semibold">{mod.aiName}</span> &mdash; {mod.description}
      </p>

      <div className="bg-bg-surface border border-border rounded-xl p-8 text-center relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: mod.color }} />
        <svg className="w-12 h-12 text-text-muted mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={mod.icon} />
        </svg>
        <h3 className="text-lg font-bold text-text-primary mb-2">Orbit is coming in Phase 3</h3>
        <p className="text-sm text-text-secondary max-w-md mx-auto">
          TikTok Shop intelligence, creator pipeline management, GMV tracking, campaign performance, and ecom growth for brand clients.
        </p>
      </div>
    </div>
  );
}
