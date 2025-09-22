import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import fs from "fs";
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: "dubai-property-helper.ru",
    port: 443,
    https: {
      key: fs.readFileSync("dubai-property-helper.ru.key"),
      cert: fs.readFileSync("dubai-property-helper.ru.pem"),
    },
    cors: true,
    strictPort: true,
    open: true,
    origin: "https://dubai-property-helper.ru",
    hmr: {
      protocol: "wss",
      host: "dubai-property-helper.ru",
      port: 443,
    },
    proxy: {
      "/api/v1/submit": {
        target: "http://localhost:3001",
      },
    },
  },
});