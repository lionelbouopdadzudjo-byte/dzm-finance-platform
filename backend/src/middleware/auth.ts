import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "missing token" });
  const token = header.replace("Bearer ", "");
  try {
    (req as any).user = jwt.verify(token, process.env.JWT_SECRET || "change-me");
    next();
  } catch {
    res.status(401).json({ error: "invalid token" });
  }
}

export function requireRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).user?.role;
    if (!role || !roles.includes(role)) return res.status(403).json({ error: "forbidden" });
    next();
  };
}
