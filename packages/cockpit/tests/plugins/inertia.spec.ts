import { defineConfig } from "@adonisjs/inertia";
import { test } from "@japa/runner";
import withCockpit from "../../src/plugins/inertia/main.js";
import { setupApp } from "../helpers.js";

function makeFakeCtx(url: string) {
  return {
    request: {
      url: () => url,
    },
  };
}

test.group("withCockpit", () => {
  test("Should expand with string", async ({ assert }) => {
    const { app } = await setupApp();
    const config = defineConfig({
      rootView: "root_layout",
    });

    const output = withCockpit(config);
    const resolved = await output.resolver(app);

    assert.typeOf(resolved.rootView, "function");

    assert.strictEqual(
      "root_layout",
      (resolved.rootView as any)(makeFakeCtx("/")),
    );

    assert.strictEqual(
      "cockpit::react_layout",
      (resolved.rootView as any)(makeFakeCtx("/admin/resources/brands")),
    );
  });

  test("Should expand with function", async ({ assert }) => {
    const { app } = await setupApp();
    const config = defineConfig({
      rootView: () => "root_layout",
    });

    const output = withCockpit(config);
    const resolved = await output.resolver(app);

    assert.typeOf(resolved.rootView, "function");

    assert.strictEqual(
      "root_layout",
      (resolved.rootView as any)(makeFakeCtx("/")),
    );

    assert.strictEqual(
      "cockpit::react_layout",
      (resolved.rootView as any)(makeFakeCtx("/admin/resources/brands")),
    );
  });
});
