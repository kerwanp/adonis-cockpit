import { AsyncLocalStorage } from "node:async_hooks";

export class GroupStorage<T> extends AsyncLocalStorage<T> {
  constructor(private name?: string) {
    super();
  }

  getStoreOrFail(): T {
    const store = super.getStore();
    if (!store) throw new Error(`No storage: ${this.name}`); // TODO: Error
    return store;
  }
}
