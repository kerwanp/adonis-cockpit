import { FileSystem } from "@japa/file-system";
import { test } from "@japa/runner";

async function setupFakeAdonisProject(fs: FileSystem) {
  await Promise.all([
    fs.create(".env", ""),
    fs.createJson("tsconfig.json", {}),
    fs.create("adonisrc.ts", "export default defineConfig({})"),
  ]);
}

test.group("Configure", (group) => {
  group.tap((t) => t.timeout(20000));
  group.each.setup(async ({ context }) => setupFakeAdonisProject(context.fs));
});
