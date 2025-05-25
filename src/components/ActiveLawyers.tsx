import Image from "next/image";
import { lawyerIcon } from "../../public/assets";
import { useTranslations } from "next-intl";

const ActiveLawyers = () => {
  const t = useTranslations();

  return (
          <div className="md:col-span-3 col-span-1 gap-6  shadow rounded-md p-4">
      <h2 className="my-6 lg:text-4xl text-3xl font-semibold text-background-dark">
        {t("active_lawyer")}
      </h2>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 shadow-md rounded-md bg-white p-2">
          <div className="rounded-full shrink-0">
            <Image
              alt="user photo"
              width={20}
              height={20}
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
