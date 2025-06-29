import { getAuthToken } from "@/lib/utils/auth-token";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { formatDate } from "@/lib/utils/formatDate";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";
import Image from "next/image";
import { privacyBg } from "../../../../../../public/assets";
import { getRequest, getRequestLawyer } from "@/lib/apis/user-requests";
import { FaUser } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { Link } from "@/i18n/routing";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import AcceptDialog from "../_components/AcceptDialog";
import RatingDialogUser from "@/components/RatingDialogUser";

type PageProps = {
  params: Promise<{ id: string; locale: string }>;
};
const Page = async ({ params }: PageProps) => {
  const { id, locale } = await params;
  const t = await getTranslations("requestpriceofferRequest");
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  const token = await getAuthToken();

  let data: HireRequestResponse;
  if (role === 1) {
    data = await getRequestLawyer(locale, "chat", id, token);
  } else if (role === 2) {
    data = await getRequest(locale, id, token);
  } else {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="p-6">
          <CardTitle>{t("error.title")}</CardTitle>
          <CardContent>
            <p className="text-xl">{t("error.invalidRole")}</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  const request = data.data;
  const formattedDate = formatDate(request.created_at, locale);
  return (
    <section className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold md:text-start text-center">
            {t("title-chat", { id: request.id || id})}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Image
            src={privacyBg}
            width={500}
            height={500}
            className="bg-cover object-cover h-full w-full rounded-lg"
            alt="background"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Request status */}
            <div className="flex  flex-col gap-2 ">
              <h3 className="text-lg font-semibold  flex items-center">
                <AiOutlineClockCircle className="h-5 w-5 me-2 text-primary " />
                {t("client.requestStatus")}
              </h3>
              <p
                className={`${
                  request.status === "completed"
                    ? "text-green-500 flex gap-2 items-center"
                    : "text-secondary"
                } text-md `}
              >
                {request.status === "completed" && <IoMdDoneAll />}
                {t(`status.${request.status}`)}
              </p>
            </div>
            {/* Request Date */}
            <div className="flex items-center gap-2 ">
              <h3 className="text-lg font-semibold  flex items-center">
                <Calendar className="h-5 w-5 me-2 text-primary " />
                {t("createdAt.label")}
              </h3>
              <p className="text-lg text-secondary">{formattedDate}</p>
            </div>
          </div>
          {/* Request Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <FileText className="h-5 w-5 me-2 text-primary " />
              {t("details.title")}
            </h3>
            <div className="break-all break-words space-y-2">
              <p>
                <span className="font-medium">{t("details.message")}:</span>{" "}
                {request.message}
              </p>
              <p>
                <span className="font-medium">{t("details.summary")}:</span>{" "}
                {request.summary}
              </p>
            </div>
          </div>

          {/* sender Data */}
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <FaUser className="h-5 w-5 me-2 text-primary " />
              {t("sender-data")}
            </h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">{t("name")}</span>
                {request.name}
              </p>
              <p>
                <span className="font-medium">{t("email")}</span>
                {request.email}
              </p>
              <p>
                <span className="font-medium">{t("mobile")}</span>
                {request.mobile}
              </p>
            </div>
          </div>
          {request.status === "accepted" && (
            <p className="flex gap-2 items-center text-green-400">
              <span className="font-medium">{t("accepted_by")}</span>
              <IoCheckmarkDoneSharp />
            </p>
          )}
          {request.status === "accepted" && (
            <div className="flex gap-2 w-full justify-end">
              <Link
                href={`/dashboard/chat/${id ||request.id }`}
                className="w-auto  md:text-lg text-md cursor-pointer px-2 py-1 bg-primary hover:bg-primary-dark rounded-lg text-white"
              >
                {t("live_chat")}
              </Link>
            </div>
          )}
          {role === 1 && <AcceptDialog requestId={id} request={request} />}
          {/* Rating Status */}
          <div>
            {!request.is_rated && request.status === "completed" && role === 2 && (
              <RatingDialogUser requestId={request.id} />
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Page;
