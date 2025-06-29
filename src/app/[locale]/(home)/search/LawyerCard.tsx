import { useTranslations } from "next-intl";
import { ClientImage } from "@/components/ClientImage";
import { FaCrown } from "react-icons/fa6";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdStar } from "react-icons/io";
import { MdLanguage, MdOutlineWork } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { useRouter } from "@/i18n/routing";

interface SearchLawyerProps {
  lawyers: SearchResult[];
  selectedType: string;
}

const LawyerCard = ({ lawyers, selectedType }: SearchLawyerProps) => {
  const t = useTranslations("lawyer");
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lawyers.map((lawyer: SearchResult) => (
        <div key={lawyer.id} className="bg-white rounded-lg overflow-hidden">
          <div className="relative h-56 w-full">
            <ClientImage
              fill
              src={lawyer.img || "/placeholder-lawyer.jpg"}
              alt={lawyer.name}
              className="object-cover"
              priority
            />
          </div>
          <div className="p-4 shadow border-2">
            <div className="flex justify-between my-1 border-b-[2px] border-b-gray-700">
              <h3 className="text-xl font-bold text-[#000000] truncate flex items-center gap-1">
                {lawyer.name}
                <FaCrown className="text-yellow-500" />
              </h3>
              <p className="text-xl font-bold text-[#000000] truncate flex items-center gap-1">
                <BiSolidBarChartAlt2 />
                {lawyer.score_points}
              </p>
            </div>

            <div className="flex justify-between my-1">
              <h3 className="text-lg font-bold text-[#000000] truncate flex items-center gap-1">
                <IoPersonCircleOutline className="text-xl" />
                {lawyer.title}
              </h3>
              <p className="text-lg font-bold text-[#000000] truncate flex items-center gap-1">
                <IoMdStar className="text-yellow-500 text-xl" />
                {lawyer.rate}
              </p>
            </div>
            <div className="flex justify-between my-1">
              <p className="text-lg font-bold text-[#000000] flex items-center gap-1 flex-wrap my-1">
                <MdLanguage className="text-xl" />
                {Array.isArray(lawyer.languages) &&
                lawyer.languages.length > 0 ? (
                  lawyer.languages.map((field, index) => (
                    <span key={index}>
                      {field}
                      {index < lawyer.languages.length - 1 && " , "}
                    </span>
                  ))
                ) : (
                  <span>N/A</span>
                )}
              </p>
              <p className="text-lg font-bold text-[#000000] truncate flex items-center gap-1">
                <CiLocationOn className="text-xl" />
                {lawyer.country}
              </p>
            </div>

            <p className="text-lg font-bold text-[#000000] flex items-center gap-1 flex-wrap my-1">
              <MdOutlineWork className="text-xl" />
              {Array.isArray(lawyer.legal_fields) &&
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
            <button
              onClick={() =>
                router.push(
                  selectedType === "companies"
                    ? `/law-firms/${lawyer.id}`
                    : `/lawyers/${lawyer.id}`
                )
              }
              className="bg-primary hover:bg-primary-dark transition-all duration-700 text-white w-full rounded-md py-3 text-xl cursor-pointer"
            >
              {t("details")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LawyerCard;
