import type * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import { getProfile } from "@/lib/apis/profile";



export async function AppSidebar({
  side = "left",
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  side?: "left" | "right";
}) {

    const profileData = await getProfile();
     if (!profileData?.data) {
    return <div>Profile data not found.</div>;
  }
  return (
    <Sidebar collapsible="icon" side={side} {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={profileData.data} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
