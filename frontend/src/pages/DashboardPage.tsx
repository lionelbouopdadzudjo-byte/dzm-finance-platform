import { useQuery } from "@tanstack/react-query";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { Bell, LayoutDashboard, Wallet } from "lucide-react";
import { get } from "../api";
import { KpiCard } from "../components/KpiCard";
import { Skeleton } from "../components/Skeleton";

export function DashboardPage() {
  const summary = useQuery({ queryKey: ["summary"], queryFn: () => get("/api/dashboard/summary") });
  const cashflow = useQuery({ queryKey: ["cashflow"], queryFn: () => get("/api/dashboard/cashflow") });
  if (summary.isLoading) return <Skeleton className="h-48" />;
  return (
    <div className="grid gap-4">
      <div className="grid md:grid-cols-3 gap-4">
        <KpiCard title="Factures" value={summary.data?.invoices ?? 0} icon={<LayoutDashboard size={16} />} />
        <KpiCard title="Paiements" value={summary.data?.payments ?? 0} icon={<Wallet size={16} />} />
        <KpiCard title="Anomalies" value={summary.data?.anomalies ?? 0} icon={<Bell size={16} />} />
      </div>
      <div className="h-72 bg-white dark:bg-slate-800 border rounded-xl p-4">
        <ResponsiveContainer>
          <BarChart data={cashflow.data || []}><XAxis dataKey="month"/><YAxis/><Tooltip/><Bar dataKey="inflow" fill="#16a34a"/><Bar dataKey="outflow" fill="#dc2626"/></BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
