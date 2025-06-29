import Image from "next/image";
import { aboutus } from "../../../public/assets";
import { getTranslations } from "next-intl/server";
import { getAboutUs } from "@/lib/apis/home";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Params {
  locale: string;
}
async function AboutContent({ params }: { params: Params }) {
  const t = await getTranslations();
 const { locale } = params;
  const response: AboutResponse = await getAboutUs(locale);

  if (!response.success || !response.data) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-2xl font-bold">{t("data_not_found_description")}</p>
      </div>
    );
  }
  return (
    <section className="min-h-screen my-8">
      <div className="w-full h-full flex justify-center items-center mx-auto p-4 container max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="w-full flex justify-center items-center">
            <Image
              className="object-contain"
              alt="about us background"
              width={500}
              height={300} 
              priority
              src={aboutus}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center my-8">
              <h2 className="lg:text-4xl text-3xl text-primary my-8 font-semibold">
                {t("about")}
              </h2>
              <div className="bg-secondary w-36 h-[6px] mt-4"></div>
            </div>
            <div className="gap-4 flex flex-col text-secondary lg:text-xl text-lg">
              <p>{response?.data?.content}</p>
            </div>
            <div className="w-full">
              <button className="border-secondary hover:bg-background-dark transition-all duration-700 border-[1px] py-3 w-36 rounded-sm text-lg hover:text-white cursor-pointer">
                {t("more")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSkeleton() {
  return (
    <section className="min-h-screen my-8">
      <div className="w-full h-full flex justify-center items-center mx-auto p-4 container">
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="w-full flex justify-center items-center">
            <Skeleton className="w-[500px] h-[300px] rounded-md" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center my-8">
              <Skeleton className="h-12 w-48" />
              <Skeleton className="w-36 h-[6px]" />
            </div>
            <div className="gap-4 flex flex-col">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-5/6" />
            </div>
            <div className="w-full">
              <Skeleton className="h-12 w-36" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About({ params }: { params: Params }) {
  return (
    <Suspense fallback={<AboutSkeleton />}>
      <AboutContent params={params} />
    </Suspense>
  );
}
