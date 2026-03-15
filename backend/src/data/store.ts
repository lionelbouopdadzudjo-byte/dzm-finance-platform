import fs from "node:fs";
import path from "node:path";

const STORE_FILE_PATH = path.resolve(process.cwd(), ".seed", "store.json");

type MutableArrays = {
  documents: any[];
  invoices: any[];
  payments: any[];
  matches: any[];
  anomalies: any[];
  alerts: any[];
  comments: any[];
};

export const store = {
  ownerAccount: { id: "owner-1", full_name: "Propriétaire DZM", email: "owner@dzm.local", telegram_chat_id: "12345", timezone: "Africa/Douala" },
  businessUnits: [
    { id: "bu-a", code: "DZM_A", name: "DZM A", owner_account_id: "owner-1", is_active: true },
    { id: "bu-b", code: "DZM_B", name: "DZM B", owner_account_id: "owner-1", is_active: true }
  ],
  supplierProfile: { id: "sup-1", owner_account_id: "owner-1", supplier_code: "DT_AZIMUT", supplier_name: "DT AZIMUT", is_exclusive_supplier: true },
  profiles: [{ id: "user-1", owner_account_id: "owner-1", email: "owner@dzm.local", full_name: "Owner", role: "owner" }],
  documents: [] as any[],
  invoices: [] as any[],
  payments: [] as any[],
  matches: [] as any[],
  anomalies: [] as any[],
  alerts: [{ id: "alert-1", owner_account_id: "owner-1", type: "critical", title: "Facture en retard", message: "INV-2025-001 est overdue", channel: "in_app", status: "pending" }],
  comments: [] as any[]
};

function replaceArray(target: any[], next: any[]) {
  target.length = 0;
  for (const item of next) target.push(item);
}

export function hydrateStoreFromDisk() {
  try {
    if (!fs.existsSync(STORE_FILE_PATH)) return false;
    const raw = fs.readFileSync(STORE_FILE_PATH, "utf8");
    const parsed: Partial<MutableArrays> = JSON.parse(raw);

    replaceArray(store.documents, parsed.documents || []);
    replaceArray(store.invoices, parsed.invoices || []);
    replaceArray(store.payments, parsed.payments || []);
    replaceArray(store.matches, parsed.matches || []);
    replaceArray(store.anomalies, parsed.anomalies || []);
    replaceArray(store.comments, parsed.comments || []);

    if (Array.isArray(parsed.alerts) && parsed.alerts.length > 0) {
      replaceArray(store.alerts, parsed.alerts);
    }

    return true;
  } catch {
    return false;
  }
}

export function persistStoreToDisk() {
  const payload: MutableArrays = {
    documents: store.documents,
    invoices: store.invoices,
    payments: store.payments,
    matches: store.matches,
    anomalies: store.anomalies,
    alerts: store.alerts,
    comments: store.comments
  };
  fs.mkdirSync(path.dirname(STORE_FILE_PATH), { recursive: true });
  fs.writeFileSync(STORE_FILE_PATH, JSON.stringify(payload, null, 2));
}

hydrateStoreFromDisk();
