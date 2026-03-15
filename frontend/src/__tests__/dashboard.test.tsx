import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../App";

describe("dashboard render", () => {
  it("renders title", () => {
    render(<QueryClientProvider client={new QueryClient()}><App /></QueryClientProvider>);
    expect(screen.getByText(/DZM Finance Platform/i)).toBeTruthy();
  });
});
