import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "src/index.ts" },
  format: ["esm", "cjs"],
  target: "es2022",
  dts: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom", "@radix-ui/themes", "lucide-react"],
});
