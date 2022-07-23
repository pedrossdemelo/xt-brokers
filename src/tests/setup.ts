import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("utils", async () => {
  return {
    ...vi.importMock("utils"),
    incrementFunds: async () => ({ data: null, error: null }),
  };
});
