import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./ui/navbar.js";
import { NavUser } from "./nav_user.js";
import { AppMenu } from "./menu/menu.js";
import { InferSerializable, User } from "adonis-cockpit/types";
import { Menu } from "adonis-cockpit/menu";

export const AppSidebar = ({
  menu,
  user,
}: {
  menu: InferSerializable<Menu>;
  user: User;
}) => {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <div className="p-4">
          <img src="https://adonis-cockpit.com/logo-horizontal.png" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <AppMenu items={menu.content} />
      </SidebarContent>
      <SidebarFooter>
        <AppMenu items={menu.footer} />
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};
