import { Menu, MenuGroup, MenuItem, MenuSubmenu } from "adonis-cockpit/menu";
import { InferSerializable } from "adonis-cockpit/types";

export type SerializedMenu = InferSerializable<Menu>;
export type SerializedMenuGroup = InferSerializable<MenuGroup>;
export type SerializedMenuItem = InferSerializable<MenuItem>;
export type SerializedMenuSubmenu = InferSerializable<MenuSubmenu>;
