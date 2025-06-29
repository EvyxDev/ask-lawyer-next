import { getServerSession } from "next-auth";
import PriceOfferLawyer from "../_components/PriceOfferLawyer";
import { cookies } from "next/headers";
import { authOptions } from "@/lib/auth/auth";
import PriceOfferUser from "../_components/PriceOfferUser";

type PageProps = {
  params: Promise<{ id: number }>;
};
const Page = async ({ params }: PageProps) => {
  const session = await getServerSession(authOptions);
  const cookieStore = cookies();
  const user_role = (await cookieStore).get("user_role")?.value;
  const role = session?.user?.role ?? user_role;

  const { id } = await params;
  return (
    <>
      {role === 1 ? <PriceOfferLawyer id={id} /> : <PriceOfferUser id={id} />}
    </>
  );
};

export default Page;
