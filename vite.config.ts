/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    coverage: {
      all: true,
      include: [
        "src/components/*.{jsx,tsx}",
        "src/hooks/**/*.{js,ts}",
        "src/pages/**/*.{jsx,tsx}",
      ],
      exclude: ["**/index.{js,ts}"],
    },
  },
});
