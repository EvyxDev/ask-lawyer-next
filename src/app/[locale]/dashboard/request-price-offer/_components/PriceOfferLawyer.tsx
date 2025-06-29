"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";
import Image from "next/image";
import { privacyBg } from "../../../../../../public/assets";
import RequestForm from "../_components/RequestForm";
import { getRequestPriceOfferLawyer } from "@/lib/apis/requestServiceform";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import useFormatDate from "@/hooks/useFormatDate";
import LoaderPriceRequest from "./LoaderPriceRequest";

const PriceOfferLawyer = ({ id }: { id: number }) => {
  const locale = useLocale();
  const { data: Lawyerdata = [],isLoading } = useQuery({
    queryKey: ["Offer_Lawyer", locale],
    queryFn: () => getRequestPriceOfferLawyer(locale, String(id)),
  });

  const t = useTranslations("requestpriceofferRequest");

  const request = Lawyerdata?.data;
  const formatdate = useFormatDate();
if (isLoading) {
    return <LoaderPriceRequest />;
  }
  return (
    <section className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold md:text-start text-center">
            {t("title", { id: request?.id })}
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
                  request?.status === "completed"
                    ? "text-green-500 flex gap-2 items-center"
                    : "text-secondary"
                } text-md `}
              >
                {request?.status === "completed" && <IoMdDoneAll />}
                {t(`status.${request?.status}`)}
              </p>
            </div>
            {/* Request Date */}
            <div className="flex items-center gap-2 ">
              <h3 className="text-lg font-semibold  flex items-center">
                <Calendar className="h-5 w-5 me-2 text-primary " />
                {t("createdAt.label")}
              </h3>
              <p className="text-lg text-secondary">
                {formatdate(request?.created_at, locale)}
              </p>
            </div>
          </div>
          {/* Request Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <FileText className="h-5 w-5 me-2 text-primary " />
              {t("details.title")}
            </h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">{t("details.message")}:</span>{" "}
                {request?.message}
              </p>
              <p>
                <span className="font-medium">{t("details.summary")}:</span>{" "}
                {request?.summary}
              </p>
            </div>
          </div>
          {/* Attached Files */}
          {request?.files && request?.files.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">{t("files.title")}</h3>
              <div className="flex gap-4">
                {request?.files.map((file: string, index: number) => (
                  <div key={index} className="relative">
                    <Button asChild>
                      <Link href={file} target="_blank">
                        {t("files.viewFile", { index: index + 1 })}
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!request?.isSentOffer && <RequestForm requestId={request?.id} />}
        </CardContent>
      </Card>
    </section>
  );
};

export default PriceOfferLawyer;
