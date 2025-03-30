import { Application } from "@adonisjs/core/app";

Application.macro("resourcesPath", function (this: Application<any>, ...paths) {
  return this.makePath("app", "cockpit", "resources", ...paths); // TODO: Might want to check for ./app
});

declare module "@adonisjs/core/app" {
  interface Application<ContainerBindings extends Record<any, any>> {
    resourcesPath(...path: string[]): string;
  }
}
