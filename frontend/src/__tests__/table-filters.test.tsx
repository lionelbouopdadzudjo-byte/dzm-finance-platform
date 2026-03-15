import { describe, it, expect } from "vitest";

describe("table filters", () => {
  it("filters bu-a", () => {
    const rows=[{business_unit_id:"bu-a"},{business_unit_id:"bu-b"}];
    expect(rows.filter(r=>r.business_unit_id==="bu-a").length).toBe(1);
  });
});
