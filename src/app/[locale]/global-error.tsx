"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { mainlogo } from "../../../public/assets";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("globalError");

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-center p-6 animate-fadeIn">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 mb-8"
            aria-label={t("homeAriaLabel")}
          >
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
            {t("description")}{" "}
            {error.digest && `(${t("errorCode")}: ${error.digest})`}
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => reset()}
              className="2xl:px-6 px-5 py-3 bg-primary text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-primary-dark transition-all duration-300"
            >
              {t("tryAgain")}
            </button>
            <Link
              href="/"
              className="2xl:px-6 px-5 py-3 bg-gray-200 text-secondary text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-300 transition-all duration-300"
            >
              {t("goHome")}
            </Link>
          </div>
        </div>

        <style jsx global>{`
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </body>
    </html>
  );
}
