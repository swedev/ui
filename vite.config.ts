import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    dts({ tsconfigPath: "./tsconfig.json" }),
  ],
  css: {
    modules: {
      generateScopedName: "[local]",
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@radix-ui/themes",
        "lucide-react",
      ],
      output: {
        assetFileNames: "index.[ext]",
      },
    },
  },
});
