import { ComponentProps, PropsWithChildren } from "react";
import { AppSidebar } from "../components/app_sidebar.js";
import { SidebarProvider, SidebarInset } from "../components/ui/navbar.js";
import { PageHeader } from "../components/ui/page_header.js";
import { AppProvider } from "../providers/app.js";
import { Toaster } from "../components/ui/sonner.js";
import { BackHandler } from "../components/back_handler.js";
import { CommandProvider } from "../providers/command.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const RootLayout = ({
  children,
  breadcrumb,
  resources,
  fields,
  layouts,
  menu,
  user,
}: PropsWithChildren<
  ComponentProps<typeof PageHeader> &
    ComponentProps<typeof AppProvider> &
    ComponentProps<typeof AppSidebar>
>) => {
  return (
    <BackHandler>
      <AppProvider resources={resources} fields={fields} layouts={layouts}>
        <ReactQueryDevtools />
        <CommandProvider>
          <SidebarProvider>
            <AppSidebar menu={menu} user={user} />
            <SidebarInset className="flex flex-col min-h-0 max-h-[calc(100vh-1rem)]">
              <PageHeader breadcrumb={breadcrumb} />
              <div className="flex flex-col gap-4 md:gap-6 grow min-h-0 overflow-y-auto">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </CommandProvider>
        <Toaster />
      </AppProvider>
    </BackHandler>
  );
};
