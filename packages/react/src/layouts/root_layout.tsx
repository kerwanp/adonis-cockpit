import { ComponentProps, PropsWithChildren } from "react";
import { AppSidebar } from "../components/app_sidebar.jsx";
import { SidebarProvider, SidebarInset } from "../components/ui/navbar.jsx";
import { PageHeader } from "../components/ui/page_header.jsx";
import { AppProvider } from "../providers/app.jsx";

export const RootLayout = ({
  children,
  breadcrumb,
  resources,
  fields,
}: PropsWithChildren<
  ComponentProps<typeof PageHeader> & ComponentProps<typeof AppProvider>
>) => {
  return (
    <AppProvider resources={resources} fields={fields}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col min-h-0 max-h-[calc(100vh-1rem)]">
          <PageHeader breadcrumb={breadcrumb} />
          <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6 grow min-h-0">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AppProvider>
  );
};
