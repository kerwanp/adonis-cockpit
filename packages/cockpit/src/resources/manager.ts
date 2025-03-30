import { LazyImport } from "../types.js";
import { BaseResource } from "./base_resource.js";

export class ResourcesManager {
  #resources: Record<string, BaseResource> = {};
  #commited = false;

  constructor(private lazyResources: LazyImport<typeof BaseResource<any>>[]) {}

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
    for (const loader of this.lazyResources) {
      // @ts-expect-error TODO: We might want to type this to non abstract
      const instance = await loader().then((r) => new r.default());
      this.register(instance);
    }
    this.#commited = true;
  }
}
