export default function AgentsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Paperclip AI Agents</h1>
          <p className="text-text-secondary text-sm">Manage and monitor AI agents across all modules</p>
        </div>
      </div>

      <div className="bg-bg-surface border border-border rounded-xl p-8 text-center">
        <svg className="w-16 h-16 text-text-muted mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
        <h3 className="text-lg font-bold text-text-primary mb-2">No agents configured yet</h3>
        <p className="text-sm text-text-secondary max-w-md mx-auto mb-4">
          Your first agent will be the Astro lead gen pipeline. Agents will appear here with run history, checkpoint queues, and enable/disable controls.
        </p>
        <div className="inline-flex items-center gap-2 text-xs text-text-muted bg-bg-primary rounded-lg px-4 py-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Agents panel activates when your first agent is deployed
        </div>
      </div>
    </div>
  );
}
