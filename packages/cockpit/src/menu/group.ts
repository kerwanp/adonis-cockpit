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

  resource(Resource: new () => BaseResource) {
    const resource = new Resource();
    const item = this.item(resource.labelPlural())
      .icon(resource.icon())
      .href(`/admin/resources/${resource.name()}`); // TODO: Do not hardcode
    return item;
  }
}

export const MenuGroupStorage = new GroupStorage<MenuGroup>("MenuGroup");
