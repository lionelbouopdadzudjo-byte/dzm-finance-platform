import { store } from "../data/store";

export function detectIntent(input: string): "business_query" | "general_query" {
  const k = ["facture", "paiement", "dzm", "impay", "kpi", "azimut", "anomalie"];
  return k.some(word => input.toLowerCase().includes(word)) ? "business_query" : "general_query";
}

export function answerBusinessQuery(input: string) {
  if (input.toLowerCase().includes("impay")) {
    const unpaid = store.invoices.filter(i => i.status !== "paid");
    return `Il y a ${unpaid.length} factures non soldées, total ${unpaid.reduce((a,b)=>a+(b.balance_due||0),0)} XAF.`;
  }
  return `Résumé: ${store.invoices.length} factures, ${store.payments.length} paiements, ${store.anomalies.length} anomalies.`;
}
