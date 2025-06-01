import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import Banner from "@/components/Banner";
import { getPrivacyPolicy } from "@/lib/apis/https";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { privacyBg } from "../../../../../public/assets";

function PrivacySkeleton() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Skeleton className="h-[40vh] w-full rounded-md mb-6" />
      <Skeleton className="h-10 w-1/3 mb-4" />
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-5/6 mb-2" />
      <Skeleton className="h-6 w-4/6 mb-2" />
    </div>
  );
}
async function PrivacyContent() {
  const t = await getTranslations();
  const locale = await getLocale();
  const response: PrivacyPolicyResponse = await getPrivacyPolicy();
  if (!response.success || !response.data) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-2xl font-bold">{t("data_not_found_description")}</p>
      </div>
    );
  }
  const content =
    locale === "ar" ? response.data.content_ar : response.data.content_en;

  if (!response.success || !response.data) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold">{t("blog_not_found")}</h1>
        <p>{t("blog_not_found_description")}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mx-auto container max-w-7xl p-4 xl:m-8 lg:m-6 m-4">
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
          {t("privacy-policy")}
        </h2>
        <div
          className="text-[#666C89] xl:text-2xl lg:text-xl text-lg "
          dangerouslySetInnerHTML={{
            __html: content.replace(/\r\n/g, "<br />"),
          }}
        />
      </div>
    </div>
  );
}
const page = async () => {
  return (
    <section>
      <Banner titleKey="privacy-policy" />
      <Suspense fallback={<PrivacySkeleton />}>
        <PrivacyContent />
      </Suspense>
    </section>
  );
};

export default page;
