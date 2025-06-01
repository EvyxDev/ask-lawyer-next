import Image from "next/image";
import { lawyerIcon } from "../../public/assets";
import { useTranslations } from "next-intl";

const ActiveLawyers = () => {
  const t = useTranslations();

  return (
    <div className="hidden lg:block md:col-span-3 gap-6  bg-[#f0f0f0] rounded-md p-4">
      <h2 className="my-6 2xl:text-3xl xl:text-2xl text-xl font-semibold text-background-dark">
        {t("active_lawyer")}
      </h2>
      <div className="flex flex-col gap-2">
        <div className="flex xl:flex-row flex-col items-center gap-2 shadow-md rounded-md bg-white p-2">
          <div className="rounded-full size-14 shrink-0">
            <Image
              alt="user photo"
              width={15}
              height={15}
              className="rounded-full w-full"
              src={lawyerIcon}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>محمد احمد ابراهيم</p>
            <p className="font-semibold">جمهورية مصر العربية</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveLawyers;
