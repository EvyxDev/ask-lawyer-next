import Banner from "@/components/Banner";
import { Link } from "@/i18n/routing";
import { getLawyer } from "@/lib/apis/lawyers";
import { getTranslations } from "next-intl/server";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaCrown } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdLanguage, MdOutlineWork } from "react-icons/md";
import { BiPhoneCall } from "react-icons/bi";
import { TbMessage2 } from "react-icons/tb";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { MdWorkOutline } from "react-icons/md";
import ActiveLawyers from "@/components/ActiveLawyers";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import renderStars from "@/components/renderStars";
import { ClientImage } from "@/components/ClientImage";

// Define the shape of params
interface PageParams {
  locale: string;
  id: string;
}

const LawyerProfileSkeleton = () => {
  return (
    <section>
      <Skeleton className="w-full h-40" />
      <div className="flex flex-col lg:gap-6 gap-4 items-center justify-center mx-auto container max-w-7xl">
        <div className="p-4 xl:m-8 lg:m-6 m-4 grid md:grid-cols-12 grid-cols-1 gap-6 w-full">
          <div className="md:col-span-9 col-span-1 flex flex-col shadow">
            <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
              <div className="md:col-span-5 col-span-1">
                <Skeleton className="w-full h-[600px]" />
              </div>
              <div className="md:col-span-7 col-span-1 flex flex-col gap-6 m-8">
                <span className="flex justify-between py-2 border-b-[2px] border-b-[#C4C4C4]">
                  <Skeleton className="h-12 w-1/2" />
                  <Skeleton className="h-8 w-20" />{" "}
                </span>
                <div>
                  <span className="flex flex-wrap lg:gap-6 gap-4 my-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-48" />{" "}
                    <Skeleton className="h-6 w-20" />
                  </span>
                  <div className="flex flex-wrap lg:gap-6 gap-4 my-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
                <Skeleton className="h-6 w-40" />
              </div>
            </div>
          </div>
          <div className="md:col-span-3 col-span-1 gap-6 shadow rounded-md">
            <Skeleton className="h-20 w-full" />
            <div className="m-6 flex justify-between flex-col lg:gap-6 gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
        <div className="p-4 xl:m-8 lg:m-6 m-4 grid md:grid-cols-12 grid-cols-1 gap-6 w-full">
          <div className="md:col-span-9 col-span-1">
            <div className="mb-4 shadow">
              <Skeleton className="h-20 w-full" />{" "}
            </div>
            <div className="mb-4 shadow">
              <Skeleton className="h-20 w-full" />{" "}
            </div>
            <div className="mb-4 shadow">
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
          <Skeleton className="md:col-span-3 col-span-1 h-96 w-full" />{" "}
        </div>
      </div>
    </section>
  );
};

// Main Page Component
const Page = async ({ params }: { params: Promise<PageParams> }) => {
  const { id } = await params;

  return (
    <Suspense fallback={<LawyerProfileSkeleton />}>
      <LawyerProfileContent id={id} />
    </Suspense>
  );
};

const LawyerProfileContent = async ({ id }: { id: string }) => {
  const t = await getTranslations("lawyer");
  const lawyerData = await getLawyer(id);
  const lawyer = lawyerData.data;
  const rate = lawyerData?.data?.rate ? parseFloat(lawyerData.data.rate) : 0;
  const ratingCount = lawyerData?.data?.rating_count || 0;

  return (
    <section>
      <Banner titleKey="lawyer.lawyers" />
      <div className="flex flex-col lg:gap-6 gap-4 items-center justify-center mx-auto container max-w-7xl">
        <div className="p-4 xl:m-8 lg:m-6 m-4 grid md:grid-cols-12 grid-cols-1 gap-6 w-full">
          <div className="md:col-span-9 col-span-1 flex flex-col shadow">
            <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
              <div className="md:col-span-5 col-span-1 flex flex-col">
                <div className="w-full h-full">
                  <ClientImage
                    className="object-cover w-full h-full"
                    alt={lawyer?.name || ""}
                    src={lawyer?.img || ""}
                    width={300}
                    height={600}
                    priority
                  />

                
                </div>
              </div>
              <div className="md:col-span-7 col-span-1 flex flex-col gap-6 m-8 text-gray-500">
                <span className="flex justify-between py-2 border-b-[2px] border-b-[#C4C4C4]">
                  <h3 className="text-5xl font-semibold truncate flex items-center gap-2">
                    {lawyer?.name}
                    <FaCrown size={40} className="text-yellow-500" />
                  </h3>
                  <p className="text-xl font-bold truncate flex items-center gap-1">
                    <BiSolidBarChartAlt2 className="text-[#000000] text-2xl" />
                    {lawyer?.score_points}
                  </p>
                </span>

                <div>
                  <span className="flex flex-wrap lg:gap-6 gap-4 my-2">
                    <h3 className="text-lg font-bold truncate flex items-center gap-1">
                      <IoPersonCircleOutline className="text-2xl text-[#000000]" />
                      {lawyer?.title}
                    </h3>
                    <p className="text-lg font-bold flex items-center gap-1 flex-wrap my-1">
                      <MdOutlineWork className="text-2xl text-[#000000]" />
                      {lawyer?.legal_fields &&
                      lawyer.legal_fields.length > 0 ? (
                        lawyer.legal_fields.map((field, index) => (
                          <span key={index}>
                            {field}
                            {index < lawyer.legal_fields.length - 1 && " , "}
                          </span>
                        ))
                      ) : (
                        <span>N/A</span>
                      )}
                    </p>
                    <p className="text-lg font-bold truncate flex items-center gap-1">
                      {renderStars(rate)}
                      <span className="ml-2">{rate}</span>
                    </p>
                  </span>
                  <div className="flex flex-wrap lg:gap-6 gap-4 my-2">
                    <p className="text-lg font-bold flex items-center gap-1 flex-wrap my-1">
                      <MdLanguage className="text-2xl text-[#000000]" />
                      {lawyer?.languages && lawyer.languages.length > 0 ? (
                        lawyer.languages.map((field, index) => (
                          <span key={index}>
                            {field}
                            {index < lawyer?.languages.length - 1 && " , "}
                          </span>
                        ))
                      ) : (
                        <span>N/A</span>
                      )}
                    </p>
                    <p className="text-lg font-bold truncate flex items-center gap-1">
                      <CiLocationOn className="text-2xl text-[#000000]" />
                      {lawyer?.country}
                    </p>
                  </div>
                </div>

                <span>
                  <p className="text-[#666C89] text-lg font-medium">
                    {t("lawyers_info")}
                  </p>
                </span>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 col-span-1 gap-6 shadow rounded-md">
            <span className="bg-[#FCFCFC] h-20 flex items-center">
              <h2 className="text-5xl font-semibold truncate flex items-center p-3 gap-2">
                {lawyer?.name}
              </h2>
            </span>
            <div className="m-6 flex justify-between flex-col lg:gap-6 gap-4">
              <Link
                className="flex gap-4 items-center hover:bg-[#f1f1f1] p-2 rounded-lg transition-all duration-500"
                href="#"
              >
                <MdWorkOutline className="text-[#E2AC6C] text-4xl" />
                <p className="text-gray-500 font-semibold text-xl">وظف محام</p>
              </Link>
              <Link
                className="flex gap-4 items-center hover:bg-[#f1f1f1] p-2 rounded-lg transition-all duration-500"
                href="#"
              >
                <BiPhoneCall className="text-[#E2AC6C] text-4xl" />
                <p className="text-gray-500 font-semibold text-xl">
                  اجراء مكالمة
                </p>
              </Link>
              <Link
                className="flex gap-4 items-center hover:bg-[#f1f1f1] p-2 rounded-lg transition-all duration-500"
                href="#"
              >
                <TbMessage2 className="text-[#E2AC6C] text-4xl" />
                <p className="text-gray-500 font-semibold text-xl">دردشة حية</p>
              </Link>
              <Link
                className="flex gap-4 items-center hover:bg-[#f1f1f1] p-2 rounded-lg transition-all duration-500"
                href="#"
              >
                <FaRegCircleQuestion className="text-[#E2AC6C] text-4xl" />
                <p className="text-gray-500 font-semibold text-xl">ارسل سؤال</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="p-4 xl:m-8 lg:m-6 m-4 grid md:grid-cols-12 grid-cols-1 gap-6 w-full">
          <div className="md:col-span-9 col-span-1">
            <div className="mb-4 shadow">
              <span className="bg-[#FCFCFC] h-20 flex items-center">
                <h2 className="text-4xl font-semibold truncate flex items-center p-3 gap-2">
                  {t("lawyer_profile")}
                </h2>
              </span>
              <p className="text-[#666C89] text-xl p-4 font-medium">
                {lawyer?.education}
              </p>
            </div>
            <div className="mb-4 shadow">
              <span className="bg-[#FCFCFC] h-20 flex items-center">
                <h2 className="text-4xl font-semibold truncate flex items-center p-3 gap-2">
                  {t("Medals")}
                </h2>
              </span>
              <p className="text-[#666C89] text-xl p-4 font-medium">
                {lawyerData?.data?.medals}
              </p>
            </div>
            <div className="mb-4 shadow">
              <span className="bg-[#FCFCFC] h-20 flex items-center">
                <h2 className="text-4xl font-semibold truncate flex items-center p-3 gap-2">
                  {t("review")}
                </h2>
              </span>
              <p className="text-[#666C89] text-xl p-4 font-medium flex items-center gap-2">
                <p className="text-lg font-bold truncate flex items-center gap-1">
                  {renderStars(rate)}
                  <span className="ml-2">{rate}</span>
                </p>
                <span>{t("based_on_ratings", { count: ratingCount })}</span>
              </p>
            </div>
          </div>
          <ActiveLawyers />
        </div>
      </div>
    </section>
  );
};

export default Page;
