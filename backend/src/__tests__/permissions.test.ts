import { describe, test, expect } from "vitest";
import { requireRole } from "../middleware/auth";

describe("role middleware", () => {
  test("forbids unauthorized", () => {
    const mw = requireRole(["owner"]);
    let status = 200;
    mw({ user: { role: "viewer" } } as any, { status: (s:number)=>({ json:()=>{status=s;} }) } as any, ()=>{});
    expect(status).toBe(403);
  });
});
