export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Projects</h1>
          <p className="text-text-secondary mt-1">
            Manage active projects and track deliverables.
          </p>
        </div>
        <button className="px-4 py-2 bg-gold hover:bg-gold/90 text-white text-sm font-medium rounded-lg transition-colors">
          + New Project
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl p-12 flex flex-col items-center justify-center text-center">
        <svg className="w-12 h-12 text-text-secondary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        <h3 className="text-lg font-semibold text-text-primary">No projects yet</h3>
        <p className="text-sm text-text-secondary mt-1 max-w-md">
          Your project board will live here. Create your first project to start tracking work.
        </p>
      </div>
    </div>
  );
}
