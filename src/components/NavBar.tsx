"use client";
import { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import Image from "next/image";
import { mainlogo } from "../../public/assets";
import { navBarLinks } from "@/lib/constants";
import { useTranslations } from "next-intl";
import ChangeLanguage from "./ChangeLanguage";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="container mx-auto w-full px-4 flex justify-between gap-4 items-center transition duration-300 h-[126px] bg-transparent max-w-7xl">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src={mainlogo}
            alt="ask lawyer logo"
            width={100}
            height={40}
            quality={100}
          />
        </Link>
        {/* Desktop Navigation */}
        <ul className="hidden lg:flex 2xl:gap-8 xl:gap-6 gap-4 items-center flex-wrap">
          {navBarLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className={`2xl:text-xl xl:text-xl lg:text-lg text-md font-semibold transition ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-black hover:text-primary"
                }`}
              >
                {t(`${link.key}`)}
              </Link>
            </li>
          ))}
        </ul>
        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button className="text-pointer" onClick={toggleMenu} aria-label="Toggle menu">
              <HiMenuAlt3 size={30} className="cursor-pointer text-black" />
          </button>
        </div>
        {/* Right Section (User Menu and Language Switcher) - Visible on Desktop */}
        <div className="hidden lg:flex 2xl:gap-4 xl:gap-3 gap-2 justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <FaRegCircleUser size={30} className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="!text-2xl font-semibold text-start rounded-3xl shadow-none">
              <DropdownMenuLabel className="text-primary text-xl font-semibold">
                {t("menu")}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href="/profile"
                  className="w-full rtl:text-end text-xl font-semibold"
                >
                  {t("profile")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/activities"
                  className="w-full rtl:text-end text-xl font-semibold"
                >
                  {t("activities")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/logout"
                  className="w-full rtl:text-end text-xl font-semibold"
                >
                  {t("logout")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ChangeLanguage />
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-screen h-screen bg-white !z-50 flex flex-col justify-center items-center">
          <button
            onClick={toggleMenu}
            aria-label="Close menu"
            className="absolute top-8 cursor-pointer end-8"
          >
            <HiX size={35} className="text-black" />
          </button>
          <ul className="flex flex-col items-center gap-6">
            {navBarLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  onClick={toggleMenu}
                  className={`text-xl font-semibold transition ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-black hover:text-primary"
                  }`}
                >
                  {t(`${link.key}`)}
                </Link>
              </li>
            ))}
            {/* Mobile User Menu */}
            <li className="flex flex-col items-center gap-4 ">
              <Link
                href="/profile"
                onClick={toggleMenu}
                className="text-xl font-semibold text-black hover:text-primary"
              >
                {t("profile")}
              </Link>
              <Link
                href="/activities"
                onClick={toggleMenu}
                className="text-xl font-semibold text-black hover:text-primary"
              >
                {t("activities")}
              </Link>
              <Link
                href="/logout"
                onClick={toggleMenu}
                className="text-xl font-semibold text-black hover:text-primary"
              >
                {t("logout")}
              </Link>
            </li>
            <li className="mt-6">
              <ChangeLanguage />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;