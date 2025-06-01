import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Banner from "@/components/Banner";
import { asklawyerLinks } from "@/lib/constants";
import { Link } from "@/i18n/routing";
import { privacyBg } from "../../../../../public/assets";

const page = async () => {
  const t = await getTranslations();

  return (
    <section>
      <Banner titleKey="ask_lawyer" />
      <div className="flex flex-col items-center justify-center">
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
            {t("ask_lawyer")}
          </h2>

          <p className="text-[#666C89] xl:text-2xl lg:text-xl text-lg my-3 font-mono">
            {t("legal_consultation_message")}
          </p>
          <div className=" flex items-center justify-center lg:gap-6 gap-4  my-4 flex-wrap">
            {asklawyerLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="bg-secondary hover:bg-secondary-dark transition-all duration-700 2xl:w-96 xl:w-80 w-72  2xl:h-52 xl:h-48 lg:h-40 h-36 shrink-0 text-white flex flex-col gap-4 items-center justify-center rounded-lg shadow-md text-center xl:text-2xl lg:text-xl text-lg font-semibold p-4 "
              >
                <Image
                  width={60}
                  alt={t(`asklawyer.${link.key}`)}
                  src={link.img}
                />

                {t(`asklawyer.${link.key}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
