// app/page.jsx
import { getTranslations } from "next-intl/server";
import { getProfile } from "@/lib/apis/profile";
import { ClientImage } from "@/components/ClientImage";
import { placeholder } from "../../../../../public/assets";
import { Skeleton } from "@/components/ui/skeleton";
import SettingsList from "./_components/SettingsList";

const page = async () => {
  const t = await getTranslations("settings-dashboard");
  const profileData = await getProfile();

  return (
    <section>
      <div className="bg-[#FFFFFF] rounded-lg shadow-md flex justify-center max-w-6xl mx-auto container h-full">
        <div className="p-8 max-w-4xl w-full flex flex-col lg:gap-8 md:gap-6 gap-4">
          <div className="flex gap-4 items-center">
            {profileData?.data ? (
              <>
                <ClientImage
                  width={80}
                  height={80}
                  src={profileData.data.img || placeholder}
                  alt={profileData.data.title || "User Profile"}
                  className="object-cover size-24 border-primary border-[2px] rounded-full"
                  priority
                />
                <span className="flex gap-2 flex-col">
                  <h2 className="text-md font-semibold">
                    {profileData.data.name || t("NA")}
                  </h2>
                  <p>{profileData.data.title}</p>
                </span>
              </>
            ) : (
              <>
                <Skeleton className="w-[80px] h-[80px] rounded-full" />
                <span className="flex gap-2 flex-col">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                </span>
              </>
            )}
          </div>
          <SettingsList />
        </div>
      </div>
    </section>
  );
};

export default page;