import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_PAGES === "true" ? "/string_alchemy/" : "/",
  build: {
    outDir: process.env.VITE_PAGES === "true" ? "docs" : "dist",
    emptyOutDir: true,
  },
  // publicDir: "./",
});
