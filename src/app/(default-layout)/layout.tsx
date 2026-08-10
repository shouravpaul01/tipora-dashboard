import { AppSidebar } from "@/components/app-sidebar";
import NotificationDrawer from "@/components/notifications/NotificationDrawer";


import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          {/* Left */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />

            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <p className="text-xl font-bold">
              Welcome{" "}
              <span className="inline-block origin-[70%_70%] animate-wave text-2xl">
                👋
              </span>
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center">
            <NotificationDrawer />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 bg-slate-50 p-5 pt-0 md:p-10">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}