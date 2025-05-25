import Banner from "@/components/Banner";
import Image from "next/image";
import { privacyBg } from "../../../../public/assets";
import { getTranslations } from "next-intl/server";
import RequestForm from "@/components/services/RequestForm";
import ActiveLawyers from "@/components/ActiveLawyers";
import { getAuthToken } from "@/lib/utils/auth-token";

const page = async () => {
  const t = await getTranslations();
  const token = await getAuthToken();
  return (
    <section>
      <Banner titleKey="chat_with_consultant" />
      <div className="mx-auto container max-w-7xl">
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
            <div className="grid md:grid-cols-12 grid-cols-2 lg:my-8 md:my-6 my-4">
              <div className="md:col-span-8 col-span-2">
                <h2 className="my-4 lg:text-4xl text-3xl font-semibold text-background-dark">
                  {t("chat_with_consultant")}
                </h2>
                <p className="text-[#666C89] xl:text-xl lg:text-lg text-md max-w-3xl">
                  {t("legal_advice_description")}
                </p>
                <RequestForm token={token} lawyer_type="advisor" type="chat" />
              </div>
              <ActiveLawyers />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
