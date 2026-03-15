import { describe, it, expect } from "vitest";
import { z } from "zod";

describe("review form schema", () => {
  it("accepts processed", () => {
    const schema = z.object({ status: z.enum(["processed", "needs_review", "error"]) });
    expect(schema.safeParse({ status: "processed" }).success).toBe(true);
  });
});
