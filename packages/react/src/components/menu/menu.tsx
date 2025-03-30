import { Link } from "@inertiajs/react";
import { Icon } from "../ui/icon.js";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/navbar.js";
import {
  SerializedMenuGroup,
  SerializedMenuItem,
  SerializedMenuSubmenu,
} from "./types.js";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible.js";
import { ChevronRight } from "lucide-react";

const MenuSubmenuItem = ({ label, icon }: SerializedMenuItem) => (
  <SidebarMenuSubItem>
    <SidebarMenuSubButton>
      <>
        <Icon icon={icon ?? "fas fa-arrow-right"} />
        <span>{label}</span>
      </>
    </SidebarMenuSubButton>
  </SidebarMenuSubItem>
);

const MenuSubmenu = ({ items }: SerializedMenuSubmenu) => (
  <SidebarMenuSub>
    {items.map((item, i) => (
      <MenuSubmenuItem key={i} {...item} />
    ))}
  </SidebarMenuSub>
);

const MenuItem = ({
  label,
  icon,
  submenu,
  href,
  target,
  prefixMatch,
}: SerializedMenuItem) => {
  const pathname = window.location.pathname;
  const isActive =
    prefixMatch && href ? pathname?.startsWith(href) : pathname === href;

  if (submenu?.collapsible) {
    return (
      <Collapsible className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <i className={icon ?? "fas fa-arrow-right"} />
              <span>{label}</span>
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {submenu && <MenuSubmenu {...submenu} />}
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} asChild>
        {target ? (
          <a href={href ?? "#"} target={target}>
            <i className={icon ?? "fas fa-arrow-right"} />
            <span>{label}</span>
          </a>
        ) : (
          <Link href={href ?? "#"} target={target}>
            <i className={icon ?? "fas fa-arrow-right"} />
            <span>{label}</span>
          </Link>
        )}
      </SidebarMenuButton>
      {submenu && <MenuSubmenu {...submenu} />}
    </SidebarMenuItem>
  );
};

const MenuGroup = ({ label, items }: SerializedMenuGroup) => (
  <SidebarGroup>
    {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
    <SidebarMenu>
      {items.map((item, i) => (
        <MenuItem key={i} {...item} />
      ))}
    </SidebarMenu>
  </SidebarGroup>
);

export const AppMenu = ({ items }: { items: SerializedMenuGroup[] }) =>
  items.map((item, i) => <MenuGroup key={i} {...item} />);
