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
