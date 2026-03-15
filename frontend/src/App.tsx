import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Bell, Bot, FileText, LayoutDashboard, LogIn, Receipt, Wallet } from "lucide-react";
import { TabKey } from "./types";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ListPage } from "./pages/ListPage";
import { ReviewPage } from "./pages/ReviewPage";
import { AssistantPage } from "./pages/AssistantPage";
import { ReportsPage } from "./pages/ReportsPage";

const tabs: { key: TabKey; label: string; icon: ReactNode }[] = [
  { key: "auth", label: "Auth", icon: <LogIn size={14} /> },
  { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={14} /> },
  { key: "invoices", label: "Factures", icon: <Receipt size={14} /> },
  { key: "payments", label: "Paiements", icon: <Wallet size={14} /> },
  { key: "review", label: "OCR Review", icon: <FileText size={14} /> },
  { key: "alerts", label: "Alertes", icon: <Bell size={14} /> },
  { key: "assistant", label: "Assistant", icon: <Bot size={14} /> },
  { key: "reports", label: "Exports", icon: <FileText size={14} /> }
];

export default function App() {
  const [tab, setTab] = useState<TabKey>("dashboard");
  const [dark, setDark] = useState(false);
  const content = useMemo(() => {
    if (tab === "auth") return <AuthPage />;
    if (tab === "dashboard") return <DashboardPage />;
    if (tab === "invoices") return <ListPage title="Liste factures" endpoint="/api/invoices" />;
    if (tab === "payments") return <ListPage title="Liste paiements" endpoint="/api/payments" />;
    if (tab === "review") return <ReviewPage />;
    if (tab === "alerts") return <ListPage title="Alertes" endpoint="/api/alerts" />;
    if (tab === "assistant") return <AssistantPage />;
    return <ReportsPage />;
  }, [tab]);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 p-4 md:p-8">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">DZM Finance Platform</h1>
          <button className="px-3 py-2 rounded border bg-white dark:bg-slate-800" onClick={() => setDark((d) => !d)}>{dark ? "Clair" : "Sombre"}</button>
        </header>
        <nav className="grid grid-cols-2 md:grid-cols-8 gap-2 mb-6">
          {tabs.map((t) => <button key={t.key} onClick={() => setTab(t.key)} className={`p-2 rounded border flex items-center gap-2 justify-center ${tab === t.key ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-800"}`}>{t.icon}{t.label}</button>)}
        </nav>
        {content}
      </div>
    </div>
  );
}
