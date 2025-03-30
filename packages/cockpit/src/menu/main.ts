import { Menu } from "./menu.js";

export { Menu } from "./menu.js";
export { MenuGroup } from "./group.js";
export { MenuItem } from "./item.js";
export { MenuSubmenu } from "./submenu.js";

// TODO: We might want to find a better way to have multiple instance
export const menu = new Menu();
