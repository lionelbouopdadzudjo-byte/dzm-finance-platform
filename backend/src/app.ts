import express from "express";
import cors from "cors";
import routes from "./routes";

export const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api", routes);
