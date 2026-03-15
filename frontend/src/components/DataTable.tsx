export function DataTable({ rows }: { rows: any[] }) {
  return (
    <div className="overflow-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-700/50">
          <tr>
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Amount</th>
            <th className="text-left p-2">Business Unit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-slate-100 dark:border-slate-700">
              <td className="p-2">{r.id}</td>
              <td className="p-2">{r.status || "-"}</td>
              <td className="p-2">{r.total_amount || r.amount || "-"}</td>
              <td className="p-2">{r.business_unit_id || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
