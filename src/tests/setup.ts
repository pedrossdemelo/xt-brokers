import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("api", async () => {
  return {
    ...vi.importMock("api"),
    incrementFunds: async () => ({ data: null, error: null }),
  };
});
