import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import copy from "rollup-plugin-copy";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/main.tsx"),
        content: "src/content-script.ts",
        background: "src/background.ts",
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },

  plugins: [
    react(),
    copy({
      verbose: true,
      hook: "writeBundle",
      targets: [
        // publicファイル(アイコンなど) を dist/public へコピー
        {
          src: "public/*",
          dest: "dist/public",
        },
        // manifest.json を distへコピー
        {
          src: "manifest.json",
          dest: "dist",
        },
        // index.htmlなどchrome extensionで使用するhtmlファイルをdistへコピー
        {
          src: "*.html",
          dest: "dist",
        },
      ],
    }),
  ],
});
