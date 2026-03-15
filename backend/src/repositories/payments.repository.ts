import { ensureInMemorySeeded } from "../data/seed-data";
import { store } from "../data/store";

export const paymentsRepository = {
  list: () => {
    ensureInMemorySeeded();
    return store.payments;
  },
  byId: (id: string) => {
    ensureInMemorySeeded();
    return store.payments.find((x) => x.id === id);
  },
  create: (payment: any) => (store.payments.push(payment), payment),
  update: (id: string, patch: any) => {
    const p = store.payments.find((x) => x.id === id);
    if (!p) return null;
    Object.assign(p, patch);
    return p;
  },
  remove: (id: string) => {
    const idx = store.payments.findIndex((x) => x.id === id);
    if (idx < 0) return false;
    store.payments.splice(idx, 1);
    return true;
  }
};
