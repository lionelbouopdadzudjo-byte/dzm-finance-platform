import { seedInMemoryData } from "../data/seed-data";
import { persistStoreToDisk } from "../data/store";

const result = seedInMemoryData(true);
persistStoreToDisk();

console.log("Seed in-memory loaded", { docs: result.docs, invoices: result.invoices, payments: result.payments });
