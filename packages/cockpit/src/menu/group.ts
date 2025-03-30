import { BaseResource } from "../resources/base_resource.js";
import { MenuItem } from "./item.js";
import { GroupStorage } from "./storage.js";

export class MenuGroup {
  protected $label?: string;
  protected $collapsible = false;

  items: MenuItem[] = [];

  label(label: string) {
    this.$label = label;
    return this;
  }

  collapsible(collapsible = true) {
    this.$collapsible = collapsible;
    return this;
  }

  toJSON() {
    return {
      label: this.$label,
      collapsible: this.$collapsible,
      items: this.items.map((item) => item.toJSON()),
    };
  }
}

export class MenuGroupBuilder {
  constructor(private onPush: (item: MenuItem) => void) {}

  item(label: string): MenuItem {
    const item = new MenuItem(label);
    this.onPush(item);
    return item;
  }

  resource(resource: (new () => BaseResource) | BaseResource) {
    const instance =
      resource instanceof BaseResource ? resource : new resource();
    const item = this.item(instance.labelPlural()).route(
      "cockpit.resources.index",
      { resource: instance.name() },
    );
    const icon = instance.icon();
    if (icon) {
      item.icon(icon);
    }

    return item;
  }
}

export const MenuGroupStorage = new GroupStorage<MenuGroup>("MenuGroup");
