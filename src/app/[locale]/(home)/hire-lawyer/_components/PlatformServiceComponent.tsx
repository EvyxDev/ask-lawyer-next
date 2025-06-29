import Banner from "@/components/Banner";
import { ClientImage } from "@/components/ClientImage";
import {
  getPlatformService,
  getsuggestedLawyers,
} from "@/lib/apis/requestServiceform";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { FaStar } from "react-icons/fa";

interface PlatformServiceProps {
  locale: string;
  id: string;
}

const PlatformServiceComponent = async ({
  locale,
  id,
}: PlatformServiceProps) => {
  const data = await getPlatformService(locale, id);
  const lawyerdata = await getsuggestedLawyers(id);
  const t = await getTranslations();
  const service: PlatformService = data?.data;
  const lawyers = lawyerdata?.data;
  return (
    <section>
      <Banner titleKey="lawyer.lawyers" />
      <div className="flex flex-col lg:gap-6 gap-4 items-center justify-center">
        <div className="mx-auto container max-w-7xl p-4 xl:m-8 lg:m-6 m-4 grid lg:grid-cols-12 grid-cols-1 gap-6">
          <div className="lg:col-span-8 col-span-1 ">
            <div className=" p-4 xl:m-9 lg:m-6 m-4 grid lg:grid-cols-12 grid-cols-1 gap-6">
              <div className="lg:col-span-6 col-span-1 w-full ">
                <ClientImage
                  width={500}
                  height={500}
                  src={service.icon}
                  alt={service.name}
                  className=" object-cover rounded"
                />
              </div>
              <div className="lg:col-span-6 col-span-1 flex flex-col gap-4  w-full p-4 ">
                <h1 className="text-2xl font-bold">{service.name}</h1>
                <p className="text-gray-600">{service.description}</p>
                {service.price && (
                  <div className="w-full flex ">
                    <p className="text-md text-[#666C89]">
                      <span className="bg-primary text-white p-1 rounded-md">
                        $ {service.price}
                      </span>
                    </p>
                  </div>
                )}
                <div className="mt-auto flex justify-end w-full">
                  <Link
                    href={`/hire-lawyer/service/${service.id}`}
                    className="w-36 text-center my-4 text-secondary-dark rounded-md bg-primary hover:bg-primary-dark transition-all duration-700 border-[1px] h-9 text-lg cursor-pointer shrink-0"
                  >
                    {t("request")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className=" md:col-span-4 gap-6  bg-[#f0f0f0] rounded-md p-4">
            <h2 className="my-6 2xl:text-3xl xl:text-2xl text-xl font-semibold text-background-dark">
              {t("suggested_lawyer")}
            </h2>
            <div className="flex flex-col gap-2">
              {lawyers && lawyers.length > 0 ? (
                lawyers.map((lawyer: lawyersService) => (
                  <div
                    key={lawyer.lawyer_id}
                    className="p-4 m-4 grid lg:grid-cols-12 grid-cols-1 gap-2 shadow-md rounded-md bg-white"
                  >
                    <div className="rounded-full shrink-0 lg:col-span-4 col-span-1 w-full">
                      <ClientImage
                        width={100}
                        height={100}
                        src={lawyer?.img}
                        alt={lawyer.lawyer_name}
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full lg:col-span-8 col-span-1">
                      <p>{lawyer.lawyer_name}</p>
                      <p className="font-semibold">{lawyer.price} $</p>
                      <p className="font-semibold flex gap-2 items-center">
                        {lawyer.rate} <FaStar className="fill-amber-400" />
                      </p>
                      <Link
                        href={`/hire-lawyer/${id}/lawyer/${lawyer?.lawyer_id}`}
                        className="w-full text-center my-4 text-white rounded-md bg-secondary hover:bg-secondary-dark transition-all duration-700 border-[1px] h-9 text-lg cursor-pointer shrink-0"
                      >
                        {t("request")}
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 m-4 text-center text-gray-500">
                  <p>{t("no_lawyers_available")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformServiceComponent;
