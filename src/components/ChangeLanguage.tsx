import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { SaLogo, UkIcon } from "../../public/assets";

const ChangeLanguage = () => {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const switchLocale = (newLocale: "ar" | "en") => {
    router.push(`${pathname}?${searchParams.toString()}`, { locale: newLocale });
  };

  return (
      <div
        className="flex items-center px-2 cursor-pointer shrink-0"
        onClick={() => switchLocale(locale === "ar" ? "en" : "ar")}
      >
        <Image
          width={40}
          height={20}
          quality={100}
          className="rounded-lg"
          alt={locale === "ar" ? "saudi arabia" : "united kingdom"}
          src={locale === "ar" ? UkIcon  : SaLogo}
        />
      </div>
  );
};

export default ChangeLanguage;