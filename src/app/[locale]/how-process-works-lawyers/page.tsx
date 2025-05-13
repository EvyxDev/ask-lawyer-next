import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Banner from "@/components/Banner";
import { privacyBg } from "../../../../public/assets";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "@/i18n/routing";

const page = async () => {
  const t = await getTranslations();

  return (
    <section>
      <Banner titleKey="how-process-works-lawyers" />
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
            {t("how-process-works-lawyers")}
          </h2>
          <p className="text-[#666C89] xl:text-xl lg:text-lg text-md my-3">
            {t("legal_advice_description-lawyers1")}
          </p>
          <p className="text-[#666C89] xl:text-xl lg:text-lg text-md my-3">
            {t("legal_advice_description-lawyers2")}
          </p>
          <div className="flex gap-4 md:flex-row flex-col flex-wrap  items-center my-4">
            <div className="bg-primary py-4 px-3  md:w-auto w-full text-center text-secondary lg:text-3xl md:text-2xl text-xl rounded-lg">
              {t("steps.confirmation_message")}
            </div>
            <FaArrowLeft
              size={50}
              className="text-primary 
   rtl:-translate-x-1 
    ltr:scale-x-[-1] 
    ltr:translate-x-1 
    md:rtl:-translate-x-1 
    md:ltr:scale-x-[-1] 
    md:ltr:translate-x-1 
    rotate-90 
    rtl:rotate-[270deg] 
    md:rotate-0 
    md:rtl:rotate-0"
            />
            <div className="bg-primary py-4 px-3  md:w-auto w-full text-center text-secondary lg:text-3xl md:text-2xl text-xl rounded-lg">
              {t("steps.attach_file")}
            </div>
            <FaArrowLeft
              size={50}
              className="  rtl:-translate-x-1 text-primary 
    ltr:scale-x-[-1] 
    ltr:translate-x-1 
    md:rtl:-translate-x-1 
    md:ltr:scale-x-[-1] 
    md:ltr:translate-x-1 
    rotate-90 
    rtl:rotate-[270deg] 
    md:rotate-0 
    md:rtl:rotate-0 "
            />
            <div className="bg-primary py-4 px-3  md:w-auto w-full text-center text-secondary lg:text-3xl md:text-2xl text-xl rounded-lg">
              {t("steps.verification")}
            </div>
            <FaArrowLeft
              size={50}
              className="  rtl:-translate-x-1 text-primary 
    ltr:scale-x-[-1] 
    ltr:translate-x-1 
    md:rtl:-translate-x-1 
    md:ltr:scale-x-[-1] 
    md:ltr:translate-x-1 
    rotate-90 
    rtl:rotate-[270deg] 
    md:rotate-0 
    md:rtl:rotate-0 "
            />
            <div className="bg-primary py-4 px-3  md:w-auto w-full text-center text-secondary lg:text-3xl md:text-2xl text-xl rounded-lg">
              {t("steps.create_account")}
            </div>
            <FaArrowLeft
              size={50}
              className="  rtl:-translate-x-1 
    ltr:scale-x-[-1] text-primary 
    ltr:translate-x-1 
    md:rtl:-translate-x-1 
    md:ltr:scale-x-[-1] 
    md:ltr:translate-x-1 
    rotate-90 
    rtl:rotate-[270deg] 
    md:rotate-0 
    md:rtl:rotate-0 "
            />
            <Link
              href="auth/register"
              className="bg-secondary my-4 hover:bg-secondary-dark transition-all duration-700 py-4 px-3 w md:w-auto w-full text-center text-white lg:text-3xl md:text-2xl text-xl rounded-lg"
            >
              {t("steps.register")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
