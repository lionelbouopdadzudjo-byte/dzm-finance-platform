import { seedInMemoryData } from "../data/seed-data";

const result = seedInMemoryData(true);
console.log("Seed in-memory loaded", { docs: result.docs, invoices: result.invoices, payments: result.payments });
