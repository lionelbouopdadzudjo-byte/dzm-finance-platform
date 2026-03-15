import { ensureInMemorySeeded } from "../data/seed-data";
import { store } from "../data/store";

export const documentsRepository = {
  list: () => {
    ensureInMemorySeeded();
    return store.documents;
  },
  byId: (id: string) => {
    ensureInMemorySeeded();
    return store.documents.find((x) => x.id === id);
  },
  create: (doc: any) => (store.documents.push(doc), doc),
  update: (id: string, patch: any) => {
    const d = store.documents.find((x) => x.id === id);
    if (!d) return null;
    Object.assign(d, patch);
    return d;
  }
};
