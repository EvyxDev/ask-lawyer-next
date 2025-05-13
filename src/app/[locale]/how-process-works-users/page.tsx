import Banner from "@/components/Banner";
import { getTranslations, getLocale } from "next-intl/server";
import { getHowProcessWorks } from "@/lib/apis/https";
import Image from "next/image";
import { HowProcessWorksBg } from "../../../../public/assets";
const page = async () => {
  const t = await getTranslations();
  const locale = await getLocale();
  const response: HowProcessWorksResponse = await getHowProcessWorks();
  if (!response.success || !response.data) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-2xl font-bold">{t("data_not_found_description")}</p>
      </div>
    );
  }
  const content =
    locale === "ar"
      ? response.data.description_ar
      : response.data.description_en;

  if (!response.success || !response.data) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold">{t("blog_not_found")}</h1>
        <p>{t("blog_not_found_description")}</p>
      </div>
    );
  }
  return (
    <section>
      <Banner titleKey="how-process-works-clients" />
      <div className="flex flex-col items-center justify-center">
        <div className="mx-auto container p-4 xl:m-8 lg:m-6 m-4">
          <div className=" grid lg:grid-cols-12 grid-cols-1 justify-between gap-6">
            <div className="flex flex-col lg:gap-6 gap-4 lg:col-span-7 col-span-1">
              <h2 className="xl:text-5xl lg:text-4xl text-3xl text-primary font-semibold">
                {t("how-process-works-clients")}
              </h2>
              <div
                className="text-[#666C89] xl:text-2xl lg:text-xl text-lg leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: content.replace(/\r\n/g, "<br />"),
                }}
              />
            </div>
            <div className=" lg:col-span-5 col-span-1">
              <Image
                alt="How Process Works Image"
                width={500}
                height={500}
                className="object-contain w-autp"
                src={HowProcessWorksBg}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
