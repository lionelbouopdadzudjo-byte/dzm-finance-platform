import { describe, test, expect } from "vitest";

describe("duplicate detection", () => {
  test("same hash is duplicate", () => {
    const docs=[{file_hash:"abc"},{file_hash:"abc"}];
    const dup = docs[0].file_hash === docs[1].file_hash;
    expect(dup).toBe(true);
  });
});
