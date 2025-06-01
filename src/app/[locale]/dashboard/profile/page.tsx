import { Suspense } from "react";
import { getProfile } from "@/lib/apis/profile";
import ProfileForm from "./_components/ProfileForm";
import ProfileFormSkeleton from "./_components/ProfileFormSkeleton";

const Page = async () => {
  const profileData = await getProfile();
  if (!profileData?.data) {
    return (
      <section className="flex flex-col gap-4 w-full">
        <div className="bg-[#FFFFFF] rounded-lg shadow-md flex justify-center items-center max-w-5xl mx-auto container h-[50vh]">
          <p className="text-3xl font-semibold text-red-500">Profile data not found.</p>
        </div>
      </section>
    );
  }
  return (
    <Suspense fallback={<ProfileFormSkeleton />}>
      <ProfileForm profileData={profileData?.data} />
    </Suspense>
  );
};

export default Page;
