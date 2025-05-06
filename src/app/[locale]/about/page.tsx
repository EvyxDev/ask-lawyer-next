import Image from "next/image";
import { aboutusBg } from "../../../../public/assets";
import { getTranslations } from "next-intl/server";

const page = async() => {
  const t = await getTranslations()
  return (
    <section>
      <div className="relative h-[40vh] flex justify-center items-center">
        <Image
          alt="about Us background "
          fill
          className="object-cover"
          src={aboutusBg}
          quality={100}
        />
        <h1 className="2xl:text-7xl xl:text-6xl text-5xl font-semibold z-50 text-white">
          {t("about")}
        </h1>
      </div>
    </section>
  );
};

export default page;
