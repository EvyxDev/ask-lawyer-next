import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Banner from "@/components/Banner";
import { clientIcon, lawyersIcon, privacyBg } from "../../../../public/assets";
import { Link } from "@/i18n/routing";

const page = async () => {
  const t = await getTranslations();

  return (
    <section>
      <Banner titleKey="how-process-works" />
      <div className="flex flex-col items-center justify-center">
        <div className="mx-auto container p-4 xl:m-8 lg:m-6 m-4">
          <div className="relative h-[40vh] flex justify-center items-center">
            <Image
              alt="Privacy Policy background"
              fill
              className="object-cover object-center rounded-md"
              quality={100}
              src={privacyBg}
            />
          </div>
          <h2 className="my-4 lg:text-4xl text-3xl font-semibold text-background-dark">
            {t("how-process-works")}
          </h2>
          <p className="text-[#666C89] xl:text-xl lg:text-lg text-md max-w-xl">
            {t("legal_advice_description")}
          </p>
          <div className="flex gap-4 my-4 w-full">
            <Link
              href="/how-process-works-lawyers"
              className="bg-secondary hover:bg-secondary-dark transition-all duration-700 w-1/2 2xl:h-48 lg:h-40 h-36 shrink-0 text-white flex flex-col gap-4 items-center justify-center rounded-lg shadow-md text-center xl:text-2xl lg:text-xl text-lg font-semibold p-4 "
            >
              <Image width={60} alt={t("lawyers")} src={lawyersIcon} />

              {t("lawyers")}
            </Link>
            <Link
              href="/how-process-works-users"
              className="bg-secondary hover:bg-secondary-dark transition-all duration-700 w-1/2 2xl:h-48 lg:h-40 h-36 shrink-0 text-white flex flex-col gap-4 items-center justify-center rounded-lg shadow-md text-center xl:text-2xl lg:text-xl text-lg font-semibold p-4 "
            >
              <Image width={60} alt={t("users")} src={clientIcon} />

              {t("users")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
