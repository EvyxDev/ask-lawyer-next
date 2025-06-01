// app/layout.tsx

import type React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Navbar } from "@/components/dashboard/NavBar";
import { getLocale } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const isRTL = locale === "ar";
  const sidebarSide = isRTL ? "right" : "left";

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="flex h-screen">
      <SidebarProvider>
        <AppSidebar side={sidebarSide} />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-4 overflow-auto ">
            <SidebarTrigger />
            <Toaster />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
