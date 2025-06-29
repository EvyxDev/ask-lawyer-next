/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getPlatformLawyerServices } from "@/lib/apis/requestServiceform";
import { ClientImage } from "@/components/ClientImage";
import { useRouter } from "@/i18n/routing";
import ServiceSkeleton from "../../(home)/hire-lawyer/_components/ServiceSkeleton";
const PlatFormPage = () => {
  const t = useTranslations("request-price-offer");
  const locale = useLocale();
  const { data: PlatformServicesData, isLoading } = useQuery({
    queryKey: ["platform-services-lawyer"],
    queryFn: () => getPlatformLawyerServices(),
  });
  const router = useRouter();

  return (
     <section className="h-full">
      <div className="lg:m-6 md:m-4 m-0 bg-[#FFFFFF] rounded-lg shadow-md p-4 h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? // Render skeleton loaders while loading
            Array.from({ length: 3 }).map((_, index) => (
              <ServiceSkeleton key={index} />
            ))
          : 
            PlatformServicesData?.data?.data?.map((service: any) => {
              const translation = service.translations.find(
                (trans: any) => trans.locale === locale
              );
              const fallbackTranslation = service.translations.find(
                (trans: any) => trans.locale === "en"
              );

              const displayTranslation = translation || fallbackTranslation;

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
                    onClick={() => router.push(`/dashboard/platform-services/${service.id}`)}
                    className="w-full my-2 text-white rounded-md bg-primary hover:bg-primary-dark transition-all duration-700 border-[1px] h-9 text-lg cursor-pointer shrink-0"
                  >
                    {t("details")}
                  </button>
                </div>
              );
            })}
      </div>
      </div>
    </section>
  );
};

export default PlatFormPage;
