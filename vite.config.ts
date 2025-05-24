import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import manifest from "./manifest.json";
// import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     input: {
  //       popup: resolve(__dirname, "index.html"),
  //     },
  //   },
  // },
});
