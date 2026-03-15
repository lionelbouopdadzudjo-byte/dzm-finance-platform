import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function KpiCard({ title, value, icon }: { title: string; value: string | number; icon: ReactNode }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500 dark:text-slate-300">{title}</span>
        {icon}
      </div>
      <div className="text-3xl font-bold mt-2">{value}</div>
    </motion.div>
  );
}
