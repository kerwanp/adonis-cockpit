import { Serializable } from "../types.js";
import { MenuItem } from "./item.js";
import { GroupStorage } from "./storage.js";

export class MenuSubmenu implements Serializable {
  protected $collapsible = false;

  items: MenuItem[] = [];

  collapsible(collapsible = true) {
    this.$collapsible = collapsible;
    return this;
  }

  toJSON() {
    return {
      kind: "submenu",
      collapsible: this.$collapsible,
      items: this.items.map((item) => item.toJSON()),
    };
  }
}

export class MenuSubmenuBuilder {
  item(label: string): MenuItem {
    const parent = MenuSubmenuStorage.getStoreOrFail();
    const item = new MenuItem(label);
    parent.items.push(item);
    return item;
  }
}

export const MenuSubmenuStorage = new GroupStorage<MenuSubmenu>();
