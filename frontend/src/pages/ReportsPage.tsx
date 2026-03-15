export function ReportsPage() {
  return (
    <div className="flex gap-2 flex-wrap">
      <a className="px-3 py-2 rounded border bg-white dark:bg-slate-800" href="http://localhost:4000/api/reports/pdf">Télécharger PDF</a>
      <a className="px-3 py-2 rounded border bg-white dark:bg-slate-800" href="http://localhost:4000/api/reports/excel">Télécharger Excel</a>
    </div>
  );
}
