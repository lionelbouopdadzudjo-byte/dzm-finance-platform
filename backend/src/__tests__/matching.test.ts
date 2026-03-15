import { describe, expect, test } from "vitest";
import { classifyMatch, computeMatchScore } from "../services/matching.service";

describe("matching", () => {
  test("exact amount + near date + reference", () => {
    const score = computeMatchScore({ business_unit_id: "bu-a", total_amount: 1000, invoice_number: "INV-1", issue_date: "2025-03-01" }, { business_unit_id: "bu-a", amount: 1000, reference: "INV-1", payment_date: "2025-03-03", beneficiary_name: "DT AZIMUT" });
    expect(score).toBeGreaterThanOrEqual(85);
    expect(classifyMatch(score)).toBe("auto_confirmed");
  });
});
