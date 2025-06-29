import Image from "next/image";
import { hero2, iphone } from "../../../public/assets";
import { getTranslations } from "next-intl/server";
import { FaApple, FaGooglePlay } from "react-icons/fa6";
import { Link } from "@/i18n/routing";

const MobileApplication = async () => {
  const t = await getTranslations();
  return (
    <section className="h-[80vh] w-full relative">
      {/* Background Image */}
      <Image
        alt="background for mobile application"
        fill
        className="object-cover"
        src={hero2}
        quality={100}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-45 z-10" />
      {/* Content Layer */}
      <div className="relative z-20 h-full w-full grid md:grid-cols-12 grid-cols-1 mx-auto container px-4">
        {/* iPhone image at bottom right */}
        <div className="col-span-6 lg:relative static">
          <div className="md:absolute hidden bottom-0 start-0 ">
            <Image
              src={iphone}
              alt="iphone"
              width={500}
              className="object-contain"
            />
          </div>
        </div>

        {/* Text on the left */}
        <div className="md:col-span-6 col-span-1 flex items-center justify-center flex-col lg:gap-8 md:gap-6 gap-4">
          <h2 className="2xl:text-7xl xl:text-6xl lg:text-5xl text-4xl font-bold text-primary">
            {t("Download the app")}
          </h2>
          {/* Download mobile app */}

          <div className="flex md:flex-row flex-col gap-3 ">
            <Link
              href={"/"}
              className="flex justify-center items-center gap-2 bg-primary-dark hover:bg-primary transition-all duration-700 w-auto px-2 py-2 rounded shrink-0"
            >
              <FaApple className="text-4xl text-white" />
              <div>
                <p className="lg:text-lg text-md font-semibold text-secondary ">
                  Download on the
                </p>
                <p className="lg:text-md text-sm text-white">Apple Store</p>
              </div>
            </Link>

            <Link
              href={"/"}
              className="flex justify-center items-center gap-2 bg-primary-dark hover:bg-primary transition-all duration-700 w-auto px-2 py-2 rounded shrink-0"
            >
              <FaGooglePlay className="text-2xl text-white" />
              <div>
                <p className="lg:text-lg text-md font-semibold text-secondary ">
                  Download on the
                </p>
                <p className="lg:text-md text-sm text-white">Google Play</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApplication;
