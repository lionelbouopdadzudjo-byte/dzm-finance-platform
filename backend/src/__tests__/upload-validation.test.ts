import { describe, test, expect } from "vitest";
import { reviewSchema } from "../validators/schemas";

describe("upload/review validation", () => {
  test("reject invalid status", () => {
    const parsed = reviewSchema.safeParse({ status: "x" });
    expect(parsed.success).toBe(false);
  });
});
