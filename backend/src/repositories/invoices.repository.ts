import { ensureInMemorySeeded } from "../data/seed-data";
import { store } from "../data/store";

export const invoicesRepository = {
  list: () => {
    ensureInMemorySeeded();
    return store.invoices;
  },
  byId: (id: string) => {
    ensureInMemorySeeded();
    return store.invoices.find((x) => x.id === id);
  },
  create: (invoice: any) => (store.invoices.push(invoice), invoice),
  update: (id: string, patch: any) => {
    const inv = store.invoices.find((x) => x.id === id);
    if (!inv) return null;
    Object.assign(inv, patch);
    return inv;
  },
  remove: (id: string) => {
    const idx = store.invoices.findIndex((x) => x.id === id);
    if (idx < 0) return false;
    store.invoices.splice(idx, 1);
    return true;
  }
};
