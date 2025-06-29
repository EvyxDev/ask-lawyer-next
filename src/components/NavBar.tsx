// components/NavBar.tsx
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
import { IoSearchOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Notifications from "./Notifications";
import { useSession } from "next-auth/react";
import { AiOutlineLogin } from "react-icons/ai";
import { LogoutDialog } from "./LogoutDialog";
import { CgProfile } from "react-icons/cg";

interface NavBarLink {
  href: string;
  key: string;
}

const NavBar = () => {
  const t = useTranslations("navbar");
  const pathname: string = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const [showLogout, setShowLogout] = useState(false);

  const toggleMenu = (): void => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav>
        <div className="container mx-auto w-full px-4 flex justify-between gap-4 items-center transition duration-300 h-[126px] bg-transparent">
          {/* Logo */}
          <Link href="/">
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
            {navBarLinks.map((link: NavBarLink, index: number) => (
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
          <div className="lg:hidden flex items-center gap-2">
            <Link href="/search">
              <IoSearchOutline size={30} />
            </Link>
            {session && (
              <div className="flex gap-2 items-center">
                <Notifications />
                <Link href="/dashboard/profile">
                  <CgProfile size={30}  />
                </Link>
              </div>
            )}
            <button
              className="text-pointer"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <HiMenuAlt3 size={30} className="cursor-pointer text-black" />
            </button>
          </div>
          {/* Right Section (User Menu, Notifications, and Language Switcher) */}
          <div className="hidden lg:flex 2xl:gap-4 xl:gap-3 gap-2 justify-center items-center">
            <Link href="/search">
              <IoSearchOutline size={30} />
            </Link>
            {session ? (
              <>
                <Notifications />
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
                        href="/dashboard/profile"
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
                      <button
                        onClick={() => setShowLogout(true)}
                        className="w-full rtl:text-end text-xl font-semibold"
                      >
                        {t("logout")}
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link
                className="fill-secondary hover:fill-secondary-dark transition-colors duration-500"
                href="/auth/login"
              >
                <AiOutlineLogin size={30} />
              </Link>
            )}

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
              {navBarLinks.map((link: NavBarLink, index: number) => (
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
              <li className="flex flex-col items-center gap-4">
                <Link
                  href="/profile"
                  className="text-xl font-semibold text-black hover:text-primary"
                >
                  {t("profile")}
                </Link>
                <Link
                  href="/activities"
                  className="text-xl font-semibold text-black hover:text-primary"
                >
                  {t("activities")}
                </Link>
                {session ? (
                  <button
                    onClick={() => setShowLogout(true)}
                    className="text-xl font-semibold text-black hover:text-primary"
                  >
                    {t("logout")}
                  </button>
                ) : (
                  <Link
                    href="/auth/login"
                    className="text-xl font-semibold text-black hover:text-primary"
                  >
                    {t("login")}
                  </Link>
                )}
              </li>
              <li className="mt-6">
                <ChangeLanguage />
              </li>
            </ul>
          </div>
        )}
      </nav>
      <LogoutDialog open={showLogout} onOpenChange={setShowLogout} />
    </>
  );
};

export default NavBar;
