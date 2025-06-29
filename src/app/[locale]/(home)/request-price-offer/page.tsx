"use client";

import Banner from "@/components/Banner";
import ActiveLawyers from "@/components/ActiveLawyers";
import Image from "next/image";
import { requestprice } from "../../../../../public/assets";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import { useRouter } from "@/i18n/routing";

const Page = () => {
  const t = useTranslations("request-price-offer");
  const role = Cookies.get("user_role");
    const router = useRouter();

  const RequestButton = () => {

    const handleClick = () => {
      if (role === "2") {
        router.push("/request-price-offer/request");
      } else {
        toast.error(t("lawyerCannotSubmitRequest"), {
          className: "!bg-red-400 !text-white !border-primary",
        });
      }
    };

    return (
      <button
        onClick={handleClick}
        className="text-secondary bg-primary hover:bg-primary-dark transition-all duration-700 border-[1px] h-12 py-2 w-36 rounded-sm text-lg cursor-pointer shrink-0"
      >
        {t("request")}
      </button>
    );
  };

  return (
    <section>
      <Banner titleKey="request-price-offer.title" />
      <div className="flex flex-col items-center justify-center">
        <div className="mx-auto container max-w-7xl p-4 xl:m-8 lg:m-6 m-4 grid lg:grid-cols-12 grid-cols-1 gap-6">
          <div className="lg:col-span-9 col-span-1 gap-4">
            <div className="p-4 lg:m-6 m-4 grid lg:grid-cols-12 grid-cols-1 gap-4 border-[1px] shadow-sm">
              <div className="lg:col-span-5 col-span-1 w-full">
                <Image
                  width={300}
                  height={200}
                  alt="request price background"
                  src={requestprice}
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-7 col-span-1 flex flex-col gap-4">
                <h2 className="md:text-4xl text-3xl text-secondary font-medium">
                  {t("getQuotesQualifiedLawyers")}
                </h2>
                <p className="text-xl text-[#666C89]">
                  {t("submitRequestGetOffersDescription")}
                </p>
                <div className="flex justify-between flex-wrap">
                  <p className="md:text-3xl text-2xl font-semibold flex text-center flex-col">
                    {t("requiredDepositAmount")}
                    <span>49 {t("dollar")}</span>
                  </p>
                  <RequestButton />
                </div>
              </div>
            </div>
            <div className="border-[1px] shadow-sm p-4 lg:m-6 m-4">
              <h2 className="md:text-2xl text-xl md:my-6 my-4">
                {t("serviceDescription")}
              </h2>
              <p className="text-[#666C89] md:text-xl text-lg">
                {t("serviceHelpDescription")}
              </p>
              <p className="text-[#666C89] md:text-xl text-lg">
                {t("quotationGuaranteeDescription")}
              </p>
              <div className="w-full flex justify-end">
                <RequestButton />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
          </div>
          <ActiveLawyers />
        </div>
      </div>
    </section>
  );
};

export default Page;
