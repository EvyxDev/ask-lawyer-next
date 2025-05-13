"use client"

import Image from "next/image";
import {  bannerBg } from "../../public/assets";
import { useTranslations } from "next-intl";

const Banner =  ({ titleKey }:{titleKey:string}) => {
  const t =  useTranslations();
  const title = t(titleKey); 

  return (
    <div className="relative h-[40vh] flex justify-center items-center">
      <Image
        alt="About Us background"
        fill
        className="object-cover"
        src={bannerBg}
        quality={100}
      />
      <div className="absolute inset-0 z-20  bg-[#05244080]"></div>
      <h1 className=" xl:text-5xl lg:text-4xl text-3xl text-center font-semibold z-40 text-white">
        {title}
      </h1>
    </div>
  );
};

export default Banner;