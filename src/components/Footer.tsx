import { Link } from "@/i18n/routing";
import { mainlogo2 } from "../../public/assets";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { footerLinks } from "@/lib/constants";
import { getFooter } from "@/lib/apis/https";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const Footer = async () => {
  const t = await getTranslations();
  const footerResponse: FooterData = await getFooter(); 
  const footerData: FooterData | null = footerResponse.data;
  if (!footerData) {
    return (
      <footer className="bg-secondary h-[30vh] w-full">
        <div className="mx-auto p-4 container h-full  flex justify-center items-center">
          <div className="text-center text-red-500 lg:text-2xl text-xl">
            <p>
              {t("error_loading") ||
                "Failed to load footer data. Please try again later."}
            </p>
          </div>
        </div>
      </footer>
    );
  }
  return (
    <footer className="bg-secondary h-full w-full">
      <div className="mx-auto p-4 container h-full">
        <div className="grid lg:grid-cols-12 md:grid-cols-4 grid-cols-2 justify-between  w-full lg:gap-6 md:gap-6 gap-4 my-8">
          <div className="lg:col-span-4 md:col-span-2 col-span-1 flex flex-col gap-4 max-w-fit ">
            <Link href="/" className="flex-shrink-0 my-4 inline-block p-0">
              <Image
                src={mainlogo2}
                alt="Main Logo"
                width={100}
                height={80}
                quality={100}
              />
            </Link>
            <p className="text-xl font-medium whitespace-normal text-start text-white break-normal max-w-44 ">
              {t("footer.get-help")}
            </p>
          </div>
          <div className="lg:col-span-4 md:col-span-2 col-span-1 flex flex-col gap-4 max-w-fit ">
            <div className="my-6">
              <div className="inline-block">
                <p className="text-primary  text-2xl font-semibold whitespace-nowrap text-start">
                  {t("footer.location")}
                </p>
              </div>
            </div>
            <ul className="text-start text-white  flex flex-col gap-4">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="2xl:text-xl xl:text-lg  text-md  transition font-medium  hover:text-primary"
                  >
                    {t(`footer.locationLinks.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4 md:col-span-2 col-span-2 flex flex-col gap-4 max-w-fit ">
            <div className="my-6">
              <div className="inline-block">
                <p className="text-primary  text-2xl font-semibold whitespace-nowrap text-start">
                  {t("footer.contact_us")}
                </p>
              </div>
            </div>
            <div className="text-start flex flex-col gap-4 text-white text-xl md:max-w-56 max-w-60 w-auto">
              <span className="flex gap-2 justify-start items-start ">
                <IoCall className="shrink-0" />
                <p>{footerData?.mobile || t("footer.NA")}</p>
              </span>
              <span className="flex gap-2 justify-start items-start ">
                <MdEmail className="shrink-0" />
                <p>{footerData?.email || t("footer.NA")}</p>
              </span>
              <span className="flex gap-2 justify-start items-start ">
                <FaLocationDot className="shrink-0" />

                <p>{footerData?.location || t("footer.NA")}</p>
              </span>
            </div>
          </div>
        </div>
        <div className="w-full bg-white h-[0.5px] my-8"></div>
        <div className="flex justify-between flex-wrap gap-4 items-center">
          <div className="flex gap-2">
            <Link
              href={footerData?.facebook || "#"}
              className="bg-white rounded-full text-xl size-12 flex justify-center items-center"
            >
              <FaFacebookF />
            </Link>
            <Link
              href={footerData?.facebook || "#"}
              className="bg-white rounded-full text-xl size-12 flex justify-center items-center"
            >
              <FaWhatsapp />
            </Link>

            <Link
              href={footerData?.facebook || "#"}
              className="bg-white rounded-full text-xl size-12 flex justify-center items-center"
            >
              <FaInstagram />
            </Link>
          </div>
          <p className="md:text-xl text-lg text-white text-start">
            All Rights Reserved to Ask Lawyer | Made and Powered by evyX
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
