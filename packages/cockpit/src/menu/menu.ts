import { Serializable } from "../types.js";
import { MenuGroup, MenuGroupBuilder } from "./group.js";
import { GroupStorage } from "./storage.js";

export class MenuBuilder {
  constructor(private onPush: (group: MenuGroup) => void) {}

  group(builder: (group: MenuGroupBuilder) => void): MenuGroup {
    const group = new MenuGroup();
    builder(new MenuGroupBuilder((item) => group.items.push(item)));
    this.onPush(group);
    return group;
  }
}

export class Menu implements Serializable {
  /** @internal */
  $content: MenuGroup[] = [];

  /** @internal */
  $footer: MenuGroup[] = [];

  content(cb: (menu: MenuBuilder) => void) {
    const builder = new MenuBuilder((group) => this.$content.push(group));
    cb(builder);
    return this;
  }

  footer(cb: (menu: MenuBuilder) => void) {
    const builder = new MenuBuilder((group) => this.$footer.push(group));
    cb(builder);
    return this;
  }

  toJSON() {
    return {
      content: this.$content.map((item) => item.toJSON()),
      footer: this.$footer.map((item) => item.toJSON()),
    };
  }
}

export const MenuStorage = new GroupStorage<Menu>("Menu");
