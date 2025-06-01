"use client";

import { hereData, HeroLinks } from "@/lib/constants";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Link } from "@/i18n/routing";
import { useQuery } from "@tanstack/react-query";
import { getHero } from "@/lib/apis/home";

const HeroSection = () => {
  const t = useTranslations("hero");
  const locale = useLocale();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: HeroData, isLoading: isHeroLoading } = useQuery({
    queryKey: ["hero"],
    queryFn: () => getHero(locale),
  });
  const images = hereData[0].images;

  return (
    <section className="w-full relative h-screen  flex justify-center items-center">
      {/* Hero Swiper Section */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className="h-full w-full"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <div className="h-screen max-h-[80vh] w-full">
              <Image
                src={img.imgUrl}
                alt={img.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#05244080] opacity-80 z-10" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-1/2 xl:start-0 xl:-translate-x-0 translate-x-1/2	start-1/2	 z-20   font-semibold bg-[#F2E9EF80] blurred rounded-sm 2xl:p-12 lg:p-8 md:p-6 p-4   md:max-w-3xl max-w-full w-full flex flex-col lg:gap-4 gap-3 ">
        {HeroData?.data && (
          <>
            <h2 className="lg:text-4xl text-2xl text-primary ">
              {HeroData.data.title}
            </h2>
            <p className="text-white lg:text-xl text-lg">
              {HeroData.data.description}
            </p>
          </>
        )}

        <button className="bg-secondary hover:bg-secondary-dark text-white lg:py-4 py-3 lg:w-40 w-36 rounded-md cursor-pointer">
          {t("more")}
        </button>
      </div>
      <div className="absolute lg:bottom-4 bottom-2 p-4  z-20 w-full flex justify-center items-center max-w-7xl">
        <div className="overflow-x-auto flex items-center lg:gap-6 gap-4 scroll-px-6  scroll-smooth">
          {HeroLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="bg-secondary hover:bg-secondary-dark transition-all duration-700 2xl:w-64 xl:w-60 md:w-56 w-48 2xl:h-48 lg:h-40 h-36 shrink-0 text-white flex flex-col gap-4 items-center justify-center rounded-lg shadow-md text-center xl:text-2xl lg:text-xl text-lg font-semibold p-4 "
            >
              <Image width={60} alt={t(link.key)} src={link.img} />

              {t(link.key)}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
