/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Banner from "@/components/Banner";
import ActiveLawyers from "@/components/ActiveLawyers";
import Image from "next/image";
import { requestprice } from "../../../../../public/assets";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { getPlatformServices } from "@/lib/apis/requestServiceform";
import { ClientImage } from "@/components/ClientImage";
import { useRouter } from "@/i18n/routing";
import ServiceSkeleton from "./_components/ServiceSkeleton";
import { useSession } from "next-auth/react";

const Page = () => {
  const t = useTranslations("request-price-offer");
  const role = Cookies.get("user_role");
  const { data: session } = useSession();
  const locale = useLocale();
  const { data: PlatformServicesData, isLoading } = useQuery({
    queryKey: ["platform-services"],
    queryFn: () => getPlatformServices(),
  });
  const router = useRouter();

  const RequestButton = () => {
  const handleClick = () => {
    if (session) {

      if (role === "2") {
        router.push("/request-price-offer/request");
      } else {
        toast.error(t("lawyerCannotSubmitRequest"), {
          className: "!bg-red-400 !text-white !border-primary",
        });
      }
    } else {
      toast.error(t("errors.loginRequired"), {
        className: "!bg-red-400 !text-white !border-red-500",
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
                <div className="flex justify-end">
                  <RequestButton />
                </div>
              </div>
            </div>
            <div className="border-[1px] shadow-sm p-4 lg:m-6 m-4 flex flex-col gap-4">
              <h2 className="md:text-2xl text-xl md:my-6 my-4">
                {t("fixed_cost_services")}
              </h2>
              <p className="text-[#666C89] md:text-xl text-lg">
                {t("fixed_cost_services_description")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading
                  ? // Render skeleton loaders while loading
                    Array.from({ length: 3 }).map((_, index) => (
                      <ServiceSkeleton key={index} />
                    ))
                  : // Render actual service cards when data is loaded
                    PlatformServicesData?.data?.data?.map((service: any) => {
                      const translation = service.translations.find(
                        (trans: any) => trans.locale === locale
                      );
                      const fallbackTranslation = service.translations.find(
                        (trans: any) => trans.locale === "en"
                      );

                      const displayTranslation =
                        translation || fallbackTranslation;

                      return (
                        <div
                          key={service.id}
                          className="border-[1px] shadow-sm p-3 rounded-md"
                        >
                          <div className="flex items-center gap-4">
                            {service.icon && (
                              <ClientImage
                                width={60}
                                height={60}
                                src={service.icon}
                                alt={displayTranslation?.name}
                                className="object-contain rounded-md"
                              />
                            )}
                            <h3 className="text-xl font-medium">
                              {displayTranslation?.name}
                            </h3>
                          </div>
                          <p className="text-[#666C89] mt-2">
                            {displayTranslation?.description}
                          </p>
                          {service.max_price && (
                            <div className="w-full flex justify-end">
                              <p className="text-md text-[#666C89]">
                                <span className="bg-primary text-white p-1 rounded-md">
                                  $ {service.price}
                                </span>
                              </p>
                            </div>
                          )}
                          <button
                            onClick={() =>
                              router.push(`hire-lawyer/${service.id}`)
                            }
                            className="w-full my-2 text-white rounded-md bg-primary hover:bg-primary-dark transition-all duration-700 border-[1px] h-9 text-lg cursor-pointer shrink-0"
                          >
                            {t("details")}
                          </button>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
          <ActiveLawyers />
        </div>
      </div>
    </section>
  );
};

export default Page;
