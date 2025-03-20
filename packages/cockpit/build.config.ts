import { defineBuildConfig } from "unbuild";
import pkg from "./package.json" assert { type: "json" };

const externals = [
  Object.keys(pkg.devDependencies),
  Object.keys(pkg.peerDependencies),
].flat();

export default defineBuildConfig({
  declaration: true,
  clean: false,
  outDir: "build",
  entries: [
    "index",
    "providers/cockpit_provider",
    "services/main",
    "src/types",
    "src/client/main",
    "src/fields/main",
    "src/plugins/inertia/main",
    "src/plugins/edge/main",
    "resources/views/main",
  ],
  rollup: {
    esbuild: {
      jsx: "automatic",
    },
  },
  externals,
});
