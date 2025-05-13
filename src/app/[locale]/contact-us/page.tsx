import Banner from "@/components/Banner";
import ContactUsForm from "@/components/home/ContactUsForm";
import { getFooter } from "@/lib/apis/https";
import { MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FiPhoneCall } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";

const page = async () => {
  const t = await getTranslations("contactus");
const footerResponse: FooterResponse = await getFooter(); 
  const footerData: FooterData | null = footerResponse.data;
  if (!footerData) {
    return (
      <footer className="bg-secondary h-[30vh] w-full">
        <div className="mx-auto p-4 container h-full flex justify-center items-center">
          <div className="text-center text-red-500 lg:text-2xl text-xl">
            <p>
              {t("error_loading") ||
                "Failed to load footer data. Please try again later."}
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <section>
      <Banner titleKey="footer.contact_us" />
      <div className="mx-auto container p-4">
        <div className="flex flex-wrap gap-4 xl:justify-between justify-center items-center xl:h-[60vh] h-full p-4 my-6">
          <div className="relative size-82 bg-white rounded-2xl border-[2px] border-gray-100 p-8 my-6">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="relative bg-primary p-4 rounded-sm">
                  <MdAlternateEmail className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            <div className="mt-12 text-center space-y-4">
              <h1 className="text-3xl font-bold text-gray-800">{t("email")}</h1>
              <p className="text-xl text-gray-600">{footerData.email}</p>
            </div>
          </div>
          <div className="relative size-82 bg-white rounded-2xl border-[2px] border-gray-100 p-8 my-6">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="relative bg-primary p-4 rounded-sm">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            <div className="mt-12 text-center space-y-4">
              <h1 className="text-3xl font-bold text-gray-800">{t("address")}</h1>
              <p className="text-xl text-gray-600">{footerData.location}</p>
            </div>
          </div>
          <div className="relative size-82 bg-white rounded-2xl border-[2px] border-gray-100 p-8 my-6">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="relative bg-primary p-4 rounded-sm">
                  <FiPhoneCall className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            <div className="mt-12 text-center space-y-4">
              <h1 className="text-3xl font-bold text-gray-800">{t("call_number")}</h1>
              <p className="text-xl text-gray-600">{footerData.mobile}</p>
            </div>
          </div>
        </div>
        <ContactUsForm />
      </div>
    </section>
  );
};

export default page;
