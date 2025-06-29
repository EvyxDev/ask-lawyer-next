"use client";

import type * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ChangeLanguage from "../ChangeLanguage";
import { usePathname, useRouter } from "@/i18n/routing";

export function Navbar({ className }: { className?: string }) {
  const t = useTranslations("navbar-dashboard");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const pathname = usePathname();
  const router = useRouter(); 
  const pageName = pathname.split("/dashboard/")[1]?.split("/")[0] || "dashboard";
const handleSearchClick = () => {
    router.push("/search");
  };
  return (
    <nav
      className={cn(
        "flex items-center bg-background border-b gap-4 p-4",
        isRTL ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      {/* Filters */}
      <div className="md:flex hidden  items-center space-x-4 lg:me-8 md:me-6 me-0">
        <ChangeLanguage />
      </div>
      {/* Centered Search Input */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md bg-[#e9edf6] rounded-2xl text-[#737B8F]">
          <Search className="absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737B8F]" />
          <Input
            type="text"
            placeholder={t("search")}
            className={cn(
              "pe-10 pr-4 py-2 w-full rounded-2xl",
              isRTL ? "text-right" : "text-left",
              "!focus:outline-none !focus:ring-0 !focus:border-inherit !focus:shadow-none"
            )}
            onClick={handleSearchClick} 
          />
        </div>
      </div>

      {/* Page Name */}
      <div className="flex items-center space-x-4">
        <span className="lg:text-xl md:text-lg text-sm font-semibold text-[#1A1A1A]">
          {t(pageName)}
        </span>
      </div>
    </nav>
  );
}