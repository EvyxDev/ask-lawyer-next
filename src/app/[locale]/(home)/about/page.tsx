import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { aboutusBg } from "../../../../../public/assets";
import About from "@/components/home/About";
type PageProps = {
  params: Promise<{ locale: string }>;
};
const page = async ({ params }: PageProps) => {
  const { locale } = await params;

  const t = await getTranslations();
  return (
    <section className="min-h-screen">
    <div className="relative h-[40vh] flex justify-center items-center">
        <Image
          alt="about Us background "
          fill
          className="object-cover"
          src={aboutusBg}
          quality={100}
        />
        <h1 className="xl:text-5xl lg:text-4xl text-3xl font-semibold z-50 text-white">
          {t("about")}
        </h1>
      </div>
      <About params={{ locale }} />
    </section>
  );
};

export default page;
