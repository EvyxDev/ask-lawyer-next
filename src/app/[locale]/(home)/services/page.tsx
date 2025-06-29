import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Banner from "@/components/Banner";
import { Link } from "@/i18n/routing";
import { servicesLinks } from "@/lib/constants";
import { privacyBg } from "../../../../../public/assets";

const page = async () => {
  const t = await getTranslations();

  return (
    <section>
      <Banner titleKey="ask-service" />
      <div className="flex flex-col items-center justify-center">
        <div className="mx-auto container max-w-7xl p-4  ">
          <div className="relative h-[40vh] flex justify-center items-center">
            <Image
              alt="Privacy Policy background"
              fill
              className="object-cover object-center rounded-md"
              quality={100}
              src={privacyBg}
            />
          </div>
          <h2 className="md:my-8 my-6 lg:text-5xl text-4xl font-semibold text-background-dark">
            {t("ask-service")}
          </h2>

          <div className=" flex items-center justify-center md:gap-4 gap-2  flex-wrap ">
            {servicesLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="overflow-hidden bg-secondary hover:bg-secondary-dark transition-all duration-700 md:gap-4 gap-2  lg:w-48 md:w-44 w-40  lg:h-40 md:h-36 h-32  shrink-0 text-white flex flex-col  items-center justify-center rounded-lg shadow-md text-center  xl:text-xl lg:text-lg md:text-md text-sm font-semibold lg:p-4 md:p-3 p-2 "
              >
                <Image width={50} alt={t(`hero.${link.key}`)} src={link.img} />

                {t(`hero.${link.key}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
