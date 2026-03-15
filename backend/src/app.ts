import express from "express";
import cors from "cors";
import routes from "./routes";
import { seedInMemoryData } from "./data/seed-data";

export const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api", routes);

const shouldSeed = process.env.AUTO_SEED_IN_MEMORY !== "false";
if (shouldSeed) {
  const seeded = seedInMemoryData(false);
  console.log("[bootstrap] in-memory data ready", seeded);
}
