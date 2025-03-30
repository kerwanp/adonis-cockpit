import { FileSystem } from "@japa/file-system";
import { test } from "@japa/runner";
import { setupApp } from "./helpers.js";
import Configure from "@adonisjs/core/commands/configure";

async function setupFakeAdonisProject(fs: FileSystem) {
  await Promise.all([
    fs.create(".env", ""),
    fs.createJson("tsconfig.json", {}),
    fs.createJson("package.json", {
      name: "cockpit-tests",
      dependencies: {},
      imports: {},
    }),
    fs.create("adonisrc.ts", "export default defineConfig({})"),
    fs.create(
      "config/inertia.ts",
      `
const inertiaConfig = defineConfig({})
export default inertiaConfig
      `,
    ),
    fs.create(
      "start/kernel.ts",
      `
router.use([])
server.use([])
      `,
    ),
  ]);
}

test.group("Configure", (group) => {
  group.tap((t) => t.timeout(60000));
  group.each.setup(async ({ context }) => setupFakeAdonisProject(context.fs));

  test("should generate files properly", async ({ assert }) => {
    const { ace } = await setupApp();

    const command = await ace.create(Configure, ["../../index.js"]);

    ace.prompt.trap("uncommited").accept();
    ace.prompt.trap("Edge.js").reject();
    ace.prompt.trap("Vine.js").reject();
    ace.prompt.trap("Lucid").reject();
    ace.prompt.trap("Vite").reject();
    ace.prompt.trap("Inertia.js").reject();
    ace.prompt.trap("Tailwindcss").reject();

    await command.exec();

    await assert.fileExists("config/cockpit.ts");
    await assert.fileExists("inertia/app/cockpit.tsx");
    await assert.fileExists("inertia/css/cockpit.css");
    await assert.fileContains("adonisrc.ts", "adonis-cockpit/cockpit_provider");
    await assert.fileContains("adonisrc.ts", "adonis-cockpit/commands");
    await assert.fileContains(
      "config/inertia.ts",
      "withCockpit(inertiaConfig)",
    );
    await assert.fileContains(
      "start/kernel.ts",
      "adonis-cockpit/cockpit_middleware",
    );

    await assert.fileContains("package.json", "#cockpit/*");
  });

  test("should configure dependencies on barebone project", async ({
    assert,
  }) => {
    const { ace } = await setupApp();

    const command = await ace.create(Configure, ["../../index.js"]);

    ace.prompt.trap("uncommited").accept();
    ace.prompt.trap("Edge.js").accept();
    ace.prompt.trap("Vine.js").accept();
    ace.prompt.trap("Lucid").accept();
    ace.prompt.trap("Select the database you want to use").chooseOption(0);
    ace.prompt
      .trap(
        `Do you want to install additional packages required by "@adonisjs/lucid"?`,
      )
      .reject();
    ace.prompt.trap("Vite").accept();
    ace.prompt.trap("Inertia.js").accept();
    ace.prompt.trap("install").reject();
    ace.prompt.trap("Tailwindcss").accept();

    await command.exec();

    // Edge
    await assert.fileContains(
      "adonisrc.ts",
      "@adonisjs/core/providers/edge_provider",
    );

    // Vine
    await assert.fileContains(
      "adonisrc.ts",
      "@adonisjs/core/providers/vinejs_provider",
    );

    // Lucid
    await assert.fileContains(
      "adonisrc.ts",
      "@adonisjs/lucid/database_provider",
    );

    // Vite
    await assert.fileContains("adonisrc.ts", "@adonisjs/vite/vite_provider");
    await assert.fileExists("vite.config.ts");

    // Inertia
    await assert.fileContains(
      "adonisrc.ts",
      "@adonisjs/inertia/inertia_provider",
    );

    // Tailwind
    await assert.fileContains("vite.config.ts", "tailwindcss()");
  });
});
