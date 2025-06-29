import { authOptions } from "@/lib/auth/auth";
import { getServerSession } from "next-auth";

import ChatRequests from "./_components/chat-requests";
import LawyersChats from "./_components/LawyersChats";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  return (
    <div>
      {role === 1 ? <LawyersChats type="chat" /> : <ChatRequests type="chat" />}
    </div>
  );
};

export default Page;
