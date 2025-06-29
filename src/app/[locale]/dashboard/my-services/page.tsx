// app/(path)/platform-services/page.tsx
// Note: File should be in the `app` directory for Next.js App Router server components
// Ensure the path matches your app's routing structure

import { Suspense } from "react";
import { AcceptedLawyerServices } from "@/lib/apis/requestServiceform";
import { getLocale, getTranslations } from "next-intl/server";
import ServiceSkeleton from "../../(home)/hire-lawyer/_components/ServiceSkeleton";
import { ClientImage } from "@/components/ClientImage";

// Define the type for the service data (since we removed @typescript-eslint/no-explicit-any)
interface Translation {
  locale: string;
  name: string;
  description: string;
}

interface Service {
  id: string;
  icon: string;
  price: number | undefined;
  max_price: number;
  translations: Translation[];
}

interface PlatformServicesData {
  data: {
    data: Service[];
  };
}

async function fetchPlatformServices(): Promise<PlatformServicesData> {
  const data = await AcceptedLawyerServices();
  return data;
}

export default async function page() {
  const t = await getTranslations("request-price-offer");
  const locale = await getLocale();

  return (
    <section className="h-full">
      <div className="lg:m-6 md:m-4 m-0 bg-[#FFFFFF] rounded-lg shadow-md p-4 h-full">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <ServiceSkeleton key={index} />
              ))}
            </div>
          }
        >
          <PlatformServicesContent locale={locale} t={t} />
        </Suspense>
      </div>
    </section>
  );
}

async function PlatformServicesContent({
  locale,
}: {
  locale: string;
  t: (key: string) => string;
}) {
  const PlatformServicesData = await fetchPlatformServices();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PlatformServicesData?.data?.data?.map((service: Service) => {
        const translation = service.translations.find(
          (trans) => trans.locale === locale
        );
        const fallbackTranslation = service.translations.find(
          (trans) => trans.locale === "en"
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
                  alt={displayTranslation?.name || "Service icon"}
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
            {service.price && (
              <div className="w-full flex justify-end">
                <p className="text-md text-[#666C89]">
                  <span className="bg-primary text-white p-1 rounded-md">
                    $ {service.price}
                  </span>
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
