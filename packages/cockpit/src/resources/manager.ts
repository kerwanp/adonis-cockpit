import { BaseResource } from "./base_resource.js";

export class ResourcesManager {
  #resources: Record<string, BaseResource> = {};

  set(key: string, value: BaseResource): this {
    this.#resources[key] = value;
    return this;
  }

  get(key: string): BaseResource | undefined {
    return this.#resources[key];
  }

  register(resource: BaseResource): this {
    this.set(resource.name(), resource);
    return this;
  }

  get resources(): Record<string, BaseResource> {
    return this.#resources;
  }
}
