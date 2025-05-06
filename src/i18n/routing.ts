//routing.ts
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
export const LOCALS = ["en", "ar"];

export const routing = defineRouting({
  locales: LOCALS,
  defaultLocale: "ar",
  localeDetection: false,

});

export const { Link, redirect, usePathname, useRouter, getPathname } = 
  createNavigation(routing);
