

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import Image from "next/image";
import { mainlogo } from "../../public/assets";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Image quality={100} className="object-cover" src={mainlogo} height={100} width={100} alt="ask lawyer logo" />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
