import { Suspense } from "react";
import { getProfile, getProfileLawyer } from "@/lib/apis/profile";
import ProfileForm from "./_components/ProfileForm";
import ProfileFormLawyer from "./_components/ProfileFormLawyer";

import ProfileFormSkeleton from "./_components/ProfileFormSkeleton";
import { authOptions } from "@/lib/auth/auth";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
const Page = async () => {
  const profileData = await getProfile();
  const profileDataLawyer = await getProfileLawyer();
  const session = await getServerSession(authOptions);
  const cookieStore = cookies();
  const user_role = (await cookieStore).get("user_role")?.value;
  const role = session?.user?.role ?? user_role;
  return (
    <Suspense fallback={<ProfileFormSkeleton />}>
      {role === 1 ? (
        <ProfileFormLawyer profileData={profileDataLawyer?.data || {}} />
      ) : (
        <ProfileForm profileData={profileData?.data  } />
      )}
    </Suspense>
  );
};

export default Page;
