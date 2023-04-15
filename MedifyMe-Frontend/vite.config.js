import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginalAssets: false,
    }),
  ],
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
});
