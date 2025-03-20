import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  outDir: "build",
  clean: false,
  entries: ["src/plugins/inertia"],
  rollup: {
    esbuild: {
      jsx: "automatic",
    },
  },
});
