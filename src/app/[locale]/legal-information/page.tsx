import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Banner from "@/components/Banner";
import { privacyBg } from "../../../../public/assets";
import { Link } from "@/i18n/routing";
import { legalInformationLinks } from "@/lib/constants";

const page = async () => {
  const t = await getTranslations("legalInformation");

  return (
    <section>
      <Banner titleKey="legalInformation.legal_information" />
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="mx-auto container p-4 xl:m-8 lg:m-6 m-4 max-w-7xl">
          <div className="relative h-[40vh] flex justify-center items-center">
            <Image
              alt="Privacy Policy background"
              fill
              className="object-cover object-center rounded-md"
              quality={100}
              src={privacyBg}
            />
          </div>
          <h2 className="my-6 lg:text-5xl text-4xl font-semibold text-background-dark">
            {t("legal_information")}
          </h2>
          <p className="text-[#666C89] xl:text-xl lg:text-lg text-md my-4 max-w-xl">
            {t("legal_consultation_info")}
          </p>
          <div className=" flex items-center lg:gap-6 gap-4 justify-center  flex-wrap">
            {legalInformationLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="bg-secondary hover:bg-secondary-dark transition-all duration-700  xl:w-64 md:w-56 w-48 2xl:h-52 xl:h-48 lg:h-40 h-36 shrink-0 text-white flex flex-col gap-4 items-center justify-center rounded-lg shadow-md text-center xl:text-2xl lg:text-xl text-lg font-semibold p-4 "
              >
                <Image width={60} alt={t(`${link.key}`)} src={link.img} />

                {t(`${link.key}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
