import { globby } from "globby";
import { LazyImport } from "../types.js";
import { BaseResource } from "./base_resource.js";
import app from "@adonisjs/core/services/app";

export type ResourcesManagerOptions = {
  autoload: boolean;
  load?: LazyImport<typeof BaseResource<any>>[];
};

export class ResourcesManager {
  #resources: Record<string, BaseResource> = {};
  #commited = false;

  constructor(private options: ResourcesManagerOptions) {}

  set(key: string, value: BaseResource): this {
    this.#resources[key] = value;
    return this;
  }

  get(key: string): BaseResource {
    return this.#resources[key];
  }

  register(resource: BaseResource): this {
    this.set(resource.name(), resource);
    return this;
  }

  get resources(): Record<string, BaseResource> {
    return this.#resources;
  }

  async commit() {
    if (this.#commited) return;

    for (const loader of this.options.load ?? []) {
      // @ts-expect-error TODO: We might want to type this to non abstract
      const instance = await loader().then((r) => new r.default());
      this.register(instance);
    }

    if (this.options.autoload) {
      // TODO: Use config path
      const result = await globby(app.makePath("app/cockpit"), {
        expandDirectories: {
          extensions: ["ts", "js"],
          files: ["*_resource"],
        },
      });

      for (const path of result) {
        const { default: Resource } = await import(path);
        const instance = new Resource();
        this.register(instance);
      }

      console.log(result);
    }

    this.#commited = true;
  }
}
