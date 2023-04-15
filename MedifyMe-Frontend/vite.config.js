import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
// import httpProxy from "http-proxy";
dotenv.config();

// const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// function createMyProxy() {
//   return httpProxy.createProxy({
//     target: process.env.VITE_SERVER_URL,
//     changeOrigin: true,
//     pathRewrite: { "^/server": "" },
//   });
// }

export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,
    host: "0.0.0.0",
  },
});
