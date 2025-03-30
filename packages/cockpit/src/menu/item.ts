import router from "@adonisjs/core/services/router";
import { InferSerializable, Serializable } from "../types.js";
import {
  MenuSubmenu,
  MenuSubmenuBuilder,
  MenuSubmenuStorage,
} from "./submenu.js";
import { GroupStorage } from "./storage.js";

export type Serialized = {
  kind: "item";
  label: string;
  href?: string;
  target?: string;
  icon?: string;
  prefixMatch: boolean;
  submenu?: InferSerializable<MenuSubmenu>;
};

export class MenuItem implements Serializable {
  #label: string;
  #href?: string;
  #target?: string;
  #icon?: string;
  #prefixMatch = false;

  protected $submenu?: MenuSubmenu;

  constructor(label: string) {
    this.#label = label;
  }

  label(label: string): this {
    this.#label = label;
    return this;
  }

  route(...params: Parameters<(typeof router)["makeUrl"]>): this {
    this.#href = router.makeUrl(...params);
    return this;
  }

  href(href: string): this {
    this.#href = href;
    return this;
  }

  target(target: string): this {
    this.#target = target;
    return this;
  }

  icon(icon: string): this {
    this.#icon = icon;
    return this;
  }

  /**
   * Make the item active using prefix matching.
   */
  prefixMatch(): this {
    this.#prefixMatch = true;
    return this;
  }

  submenu(cb: (submenu: MenuSubmenuBuilder) => void): MenuSubmenu {
    const submenu = new MenuSubmenu();
    MenuSubmenuStorage.run(submenu, () => cb(new MenuSubmenuBuilder()));
    this.$submenu = submenu;
    return submenu;
  }

  /**
   * Make the item active using exact matching.
   */
  exactMatch(): this {
    this.#prefixMatch = false;
    return this;
  }

  toJSON(): Serialized {
    return {
      kind: "item" as const,
      label: this.#label,
      href: this.#href,
      target: this.#target,
      icon: this.#icon,
      prefixMatch: this.#prefixMatch,
      submenu: this.$submenu?.toJSON(),
    };
  }
}

export const MenuItemStorage = new GroupStorage<MenuItem>();
