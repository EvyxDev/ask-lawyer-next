"use client";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { MdLanguage } from "react-icons/md";

const ChangeLanguage = () => {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const t = useTranslations();
  const switchLocale = (newLocale: "ar" | "en") => {
    router.push(`${pathname}?${searchParams.toString()}`, {
      locale: newLocale,
    });
  };

  return (
    <div
      className="rounded-md flex cursor-pointer justify-between items-center shadow-sm w-full p-4"
      onClick={() => switchLocale(locale === "ar" ? "en" : "ar")}
    >
      <div className="flex gap-2 w-full items-center">
        <span className="bg-primary p-3 rounded-full">
          <MdLanguage size={25} />
        </span>
        <h2 className="text-primary text-xl font-extrabold">
          {t(`settings-dashboard.change_language`)}
        </h2>
      </div>
      <IoIosArrowBack  className="ltr:rotate-180" size={30} />
    </div>
  );
};

export default ChangeLanguage;
