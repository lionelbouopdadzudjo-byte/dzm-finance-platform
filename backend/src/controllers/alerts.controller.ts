import { Request, Response } from "express";
import { store } from "../data/store";

export const alertsController = {
  list(_req: Request, res: Response) { res.json(store.alerts); },
  read(req: Request, res: Response) {
    const alert = store.alerts.find((x) => x.id === req.params.id);
    if (!alert) return res.status(404).json({ error: "alert not found" });
    alert.status = "read";
    res.json(alert);
  }
};
