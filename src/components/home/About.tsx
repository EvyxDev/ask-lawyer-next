import Image from "next/image";
import { aboutus } from "../../../public/assets";
import { getTranslations } from "next-intl/server";

const About = async () => {
  const t = await getTranslations();
  return (
    <section className="min-h-screen my-8">
      <div className="w-full h-full flex justify-center items-center mx-auto p-4 container ">
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="w-full flex justify-center items-center">
            <Image
              className="object-contain"
              alt="about us background"
              width={500}
              src={aboutus}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center my-8">
              <h2 className="text-5xl text-primary my-8 font-semibold">
                {t("about")}
              </h2>
              <div className="bg-secondary w-36 h-[6px] mt-4"></div>
            </div>
            <div className="gap-4 flex flex-col text-secondary">
                <p>
                    About Content ARAbout Content ARAbout Content ARAbout Content ARAbout Content ARAbout Content AR
                </p>
                <p>
                    About Content ARAbout Content ARAbout Content ARAbout Content ARAbout Content ARAbout Content AR
                </p>
                <p>
                    About Content ARAbout Content ARAbout Content ARAbout Content ARAbout Content ARAbout Content AR
                </p>
                <p>
                    About Content ARAbout Content ARAbout Content ARAbout Content ARAbout Content ARAbout Content AR
                </p>
                <p>
                    About Content ARAbout Content ARAbout Content ARAbout Content ARAbout Content ARAbout Content AR
                </p>
                <p>
                    About Content ARAbout Content ARAbout Content ARAbout Content ARAbout Content ARAbout Content AR
                </p>
             
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
};

export default About;
