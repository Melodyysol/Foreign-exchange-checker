import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/v1": {
        target: "https://api.frankfurter.app/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/v1/, ""),
      },
    },
  },
});
