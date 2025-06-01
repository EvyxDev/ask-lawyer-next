"use client";

import { BadgeCheck, ChevronsUpDown, CreditCard, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";
import { signOut } from "next-auth/react";
import { useRouter } from "@/i18n/routing";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
  };
}) {
  const { isMobile } = useSidebar();
  const t = useTranslations();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const result = await logout();
      signOut();
      router.push("auth/login");
      console.log(result);
      setIsLogoutModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطأ غير معروف");
    }
  };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => handleNavigation("/dashboard/profile")}
                >
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  {t("profile")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavigation("/dashboard/subscriptions")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  {t("subscriptions")}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsLogoutModalOpen(true)}>
                <LogOut className="mr-2 h-4 w-4" />
                {t("logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <DialogContent className="sm:max-w-sm flex flex-col gap-8 items-center text-center">
          <DialogHeader className="flex flex-col gap-4">
            <DialogTitle className="text-center">
              {t("logout_confirm_title")}
            </DialogTitle>
            <DialogDescription>
              {error || t("logout_confirm_description")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="border-primary border-2 text-primary hover:bg-primary hover:text-white bg-transparent"
              onClick={() => setIsLogoutModalOpen(false)}
            >
              {t("cancel")}
            </Button>
            <Button onClick={handleLogout}>{t("logout")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
