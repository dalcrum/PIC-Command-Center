export default function FinancialsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Financials</h1>
        <p className="text-text-secondary mt-1">
          Revenue tracking, invoices, and financial overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Revenue MTD", value: "$0" },
          { label: "Outstanding Invoices", value: "$0" },
          { label: "Expenses MTD", value: "$0" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-surface border border-border rounded-xl p-5"
          >
            <p className="text-sm text-text-secondary">{stat.label}</p>
            <p className="text-2xl font-bold text-text-primary mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl p-12 flex flex-col items-center justify-center text-center">
        <svg className="w-12 h-12 text-text-secondary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-text-primary">Financial dashboard coming soon</h3>
        <p className="text-sm text-text-secondary mt-1 max-w-md">
          Track revenue, manage invoices, and view financial reports here.
        </p>
      </div>
    </div>
  );
}
