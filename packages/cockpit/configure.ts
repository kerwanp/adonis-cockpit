import { Kernel } from "@adonisjs/core/ace";
import Configure from "@adonisjs/core/commands/configure";
import ConfigureCommand from "@adonisjs/core/commands/configure";
import stringHelpers from "@adonisjs/core/helpers/string";
import { execSync } from "node:child_process";
import { PackageJson, readPackageJSON, writePackageJSON } from "pkg-types";
import { stubsRoot } from "./stubs/main.js";

function hasUncommittedChanges() {
  try {
    const status = execSync("git status --porcelain", { encoding: "utf8" });
    return status.trim().length > 0; // Returns true if there are changes
  } catch (error) {
    return false;
  }
}

const logo = `
  _____         __         _ __
 / ___/__  ____/ /__ ___  (_) /_
/ /__/ _ \\/ __/  '_// _ \\/ / __/
\\___/\\___/\\__/_/\\_\\/ .__/_/\\__/
                  /_/`;

type DependencyInfo = {
  title: string;
  detect: (context: Context) => boolean | string;
  run: (context: Context) => Promise<void>;
};

async function installPackages(
  { command }: Context,
  dependencies: string | string[],
  isDev = false,
) {
  const codemods = await command.createCodemods();
  await codemods.installPackages(
    [dependencies].flat().map((name) => ({
      name,
      isDevDependency: isDev,
    })),
  );
}

async function configurePackage(
  { ace }: Context,
  name: string,
  trap?: (command: Configure) => void,
) {
  const command = await ace.create(Configure, [name]);
  trap?.(command);
  await command.exec();
}

const missingDependenciesSteps: DependencyInfo[] = [
  {
    title: "Edge.js",
    detect: ({ pkg }) => hasPackage(pkg, "edge.js"),
    run: async (context) => {
      await installPackages(context, "edge.js");
      await configurePackage(context, "edge");
    },
  },
  {
    title: "Vine.js",
    detect: ({ pkg }) => hasPackage(pkg, "@vinejs/vine"),
    run: async (context) => {
      await installPackages(context, "@vinejs/vine");
      await configurePackage(context, "vinejs");
    },
  },
  {
    title: "Lucid",
    detect: ({ pkg }) => hasPackage(pkg, "@adonisjs/lucid"),
    run: async (context) => {
      await installPackages(context, "@adonisjs/lucid");
      await configurePackage(context, "@adonisjs/lucid");
    },
  },
  {
    title: "Vite",
    detect: ({ pkg }) => hasPackage(pkg, "@adonisjs/vite"),
    run: async (context) => {
      await installPackages(context, "@adonisjs/vite");
      await configurePackage(context, "@adonisjs/vite", (command) => {
        command.prompt.trap(`Do you want to install "vite"?`).accept();
      });
    },
  },
  {
    title: "Inertia.js",
    detect: ({ pkg }) => hasPackage(pkg, "@adonisjs/inertia"),
    run: async (context) => {
      await installPackages(context, "@adonisjs/inertia");
      await configurePackage(context, "@adonisjs/inertia", (command) => {
        command.prompt
          .trap("Select the Inertia adapter you want to use")
          .replyWith("React");
        command.prompt
          .trap("Do you want to use server-side rendering?")
          .reject();
      });
    },
  },
  {
    title: "Tailwindcss",
    // TODO: Check tailwindcss version
    detect: ({ pkg }) => hasPackage(pkg, "tailwindcss", true),
    run: async (context) => {
      const codemods = await context.command.createCodemods();
      await installPackages(
        context,
        ["tailwindcss", "@tailwindcss/vite"],
        true,
      );

      await codemods.registerVitePlugin("tailwindcss()", [
        {
          isNamed: false,
          module: "@tailwindcss/vite",
          identifier: "tailwindcss",
        },
      ]);
    },
  },
];

type Context = {
  command: ConfigureCommand;
  ace: Kernel;
  pkg: PackageJson;
};

async function detectMissingDependencies(context: Context) {
  const missing: DependencyInfo[] = [];

  for (const dependency of missingDependenciesSteps) {
    if (!dependency.detect(context)) {
      missing.push(dependency);
    }
  }

  context.command.logger.info(
    missing.length
      ? `${stringHelpers.sentence(missing.map((m) => m.title))} must be configured`
      : "No dependency needs to be configured",
  );

  return missing;
}

async function checkUncommitedChanges(context: Context) {
  if (!hasUncommittedChanges()) return;

  const confirm = await context.command.prompt.confirm(
    "You have uncommited changes, are you sure you want to continue",
    { name: "uncommited" },
  );

  if (!confirm) {
    process.exit(0);
  }
}

async function configureDependency(
  context: Context,
  dependency: DependencyInfo,
) {
  const install = await context.command.prompt.confirm(
    `Do you want to configure ${dependency.title}`,
    { name: dependency.title },
  );

  if (install !== true) {
    return;
  }

  context.command.logger.log(
    context.command.colors.yellow(
      `\n─────────── Configuring ${dependency.title}`,
    ),
  );

  await dependency.run(context);

  context.command.logger.log(context.command.colors.yellow(`───────────\n`));
}

function hasPackage(pkg: PackageJson, name: string, isDev = false) {
  return Object.keys(
    (isDev ? pkg.devDependencies : pkg.dependencies) ?? {},
  ).includes(name);
}

async function registerRoute({ command }: Context) {
  const codemods = await command.createCodemods();
  const tsMorph = await codemods.getTsMorphProject();
  const routesFile = tsMorph?.getSourceFile(
    command.app.makePath("start/routes.ts"),
  );

  if (!routesFile) {
    return command.logger.warning("Unable to find start/routes.ts file");
  }

  const action = command.logger.action("update start/routes.ts file");

  try {
    routesFile.addStatements((writer) => {
      writer.writeLine(`cockpit.registerRoutes()`);
    });

    routesFile.addImportDeclaration({
      moduleSpecifier: "adonis-cockpit/services/main",
      defaultImport: "cockpit",
    });

    await tsMorph?.save();
    action.succeeded();
  } catch (error) {
    codemods.emit("error", error);
    action.failed(error.message);
  }
}

async function registerInertiaPlugin({ command }: Context) {
  const codemods = await command.createCodemods();
  const tsMorph = await codemods.getTsMorphProject();
  const routesFile = tsMorph?.getSourceFile(
    command.app.makePath("config/inertia.ts"),
  );

  if (!routesFile) {
    return command.logger.warning("Unable to find config/inertia.ts file");
  }

  const action = command.logger.action("update config/inertia.ts file");

  try {
    routesFile.addImportDeclaration({
      moduleSpecifier: "adonis-cockpit/plugins/inertia",
      defaultImport: "withCockpit",
    });

    routesFile.removeDefaultExport();

    routesFile.addStatements((writer) => {
      writer.writeLine("export default withCockpit(inertiaConfig)");
    });

    await tsMorph?.save();
    action.succeeded();
  } catch (error) {
    codemods.emit("error", error);
    action.failed(error.message);
  }
}

async function registerImportPath({ command }: Context) {
  const pkg = await readPackageJSON(command.app.appRoot.pathname);
  pkg.imports = {
    ...(pkg.imports ?? {}),
    "#cockpit/*": "./app/cockpit/*.js",
  };

  await writePackageJSON(command.app.makePath("package.json"), pkg);
}

export async function configure(command: ConfigureCommand) {
  const ace = await command.app.container.make("ace");
  const pkg = await readPackageJSON(command.app.appRoot.pathname);

  const context: Context = {
    command,
    ace,
    pkg,
  };

  command.logger.log(command.colors.magenta(logo));
  command.logger.log(command.colors.gray("_______________________________\n"));
  command.logger.log(command.colors.yellow("ⓘ  Version: Pre-release\n"));

  await checkUncommitedChanges(context);

  const missing = await detectMissingDependencies(context);

  for (const dependency of missing) {
    await configureDependency(context, dependency);
  }

  context.command.logger.log(
    context.command.colors.yellow(`\n─────────── Configuring Adonis Cockpit`),
  );

  const codemods = await command.createCodemods();

  await codemods.updateRcFile((rcFile) => {
    rcFile.addProvider("adonis-cockpit/cockpit_provider");
    rcFile.addPreloadFile("#start/cockpit");
    rcFile.addCommand("adonis-cockpit/commands");
  });

  await codemods.registerMiddleware("server", [
    {
      path: "adonis-cockpit/cockpit_middleware",
      position: "after",
    },
  ]);

  await codemods.makeUsingStub(stubsRoot, "cockpit.css.stub", {});
  await codemods.makeUsingStub(stubsRoot, "cockpit.tsx.stub", {});
  await codemods.makeUsingStub(stubsRoot, "config/cockpit.stub", {});
  await registerRoute(context);
  await registerInertiaPlugin(context);
  await registerImportPath(context);
  await installPackages(context, ["@adonis-cockpit/react"]);

  return;
}
