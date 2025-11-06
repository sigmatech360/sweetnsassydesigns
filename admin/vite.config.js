import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/sweet-n-sassy/admin/",
  resolve: {
    alias: {
      "@/components": "/src/components",
      "@/utils": "/src/utils",
      "@/assets": "/src/assets",
    },
  },
});
