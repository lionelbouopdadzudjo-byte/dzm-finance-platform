import { describe, expect, test } from "vitest";
import { seedInMemoryData } from "../data/seed-data";
import { store } from "../data/store";
import { invoicesRepository } from "../repositories/invoices.repository";
import { paymentsRepository } from "../repositories/payments.repository";

describe("seed flow", () => {
  test("seed populates store used by repositories/controllers", () => {
    const result = seedInMemoryData(true);
    expect(result.invoices).toBeGreaterThan(0);
    expect(store.invoices.length).toBeGreaterThan(0);
    expect(store.payments.length).toBeGreaterThan(0);
    expect(invoicesRepository.list().length).toBeGreaterThan(0);
    expect(paymentsRepository.list().length).toBeGreaterThan(0);
  });
});
