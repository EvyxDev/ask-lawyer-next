import Link from "next/link";
import Image from "next/image";
import { mainlogo } from "../../../public/assets";
import { getTranslations } from "next-intl/server"; 

export default async function NotFound() {
  const t = await getTranslations("notFound"); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-center p-6 animate-fadeIn">
      {/* Logo */}
      <Link href="/" className="flex-shrink-0 mb-8" aria-label={t("homeAriaLabel")}>
        <Image
          src={mainlogo}
          alt={t("logoAlt")}
          width={150}
          height={40}
          priority
        />
      </Link>

      <h2 className="2xl:text-5xl xl:text-6xl lg:text-5xl text-4xl font-extrabold text-secondary mb-4">
        {t("title")}
      </h2>

      <p className="text-secondary text-lg md:text-xl max-w-md mb-8">
        {t("description")}
      </p>

      {/* Go Home Button */}
      <Link
        href="/"
        className="2xl:px-6 px-5 py-3 bg-primary text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-primary-dark transition-all duration-300"
      >
        {t("goHome")}
      </Link>
    </div>
  );
}