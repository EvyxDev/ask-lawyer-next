import { authOptions } from "@/lib/auth/auth";
import { getServerSession } from "next-auth";
import ChatUser from "../_components/ChatUser";
import ChatLawyer from "../_components/ChatLawyer";

type PageProps = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: PageProps) => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  const { id } =await params; 

  return (
    <div>
      {role === 1 ? <ChatLawyer chatId={id} /> : <ChatUser chatId={id} />}
    </div>
  );
};

export default Page;