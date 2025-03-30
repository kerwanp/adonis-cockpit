import { IgnitorFactory } from "@adonisjs/core/factories";

export const BASE_URL = new URL("./tmp/", import.meta.url);

export async function setupApp() {
  const ignitor = new IgnitorFactory()
    .withCoreProviders()
    .withCoreConfig()
    .create(BASE_URL, {
      importer: (filePath) => {
        if (filePath.startsWith("./") || filePath.startsWith("../")) {
          return import(new URL(filePath, BASE_URL).href);
        }

        return import(filePath);
      },
    });

  const app = ignitor.createApp("web");
  await app.init().then(() => app.boot());

  const ace = await app.container.make("ace");
  ace.ui.switchMode("raw");

  return { ace, app };
}
