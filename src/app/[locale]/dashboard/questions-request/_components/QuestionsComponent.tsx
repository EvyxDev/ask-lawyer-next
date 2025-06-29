"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoFilter } from "react-icons/io5";
import CustomPagination from "@/components/CustomPagination";
import { Link } from "@/i18n/routing";
import useFormatDate from "@/hooks/useFormatDate";
import { Skeleton } from "@/components/ui/skeleton";
import ActiveLawyers from "@/components/ActiveLawyers";
import { Button } from "@/components/ui/button";
import { IoIosAdd } from "react-icons/io";
import { getRequests, getRequestsLawyer } from "@/lib/apis/user-requests";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaCircleQuestion } from "react-icons/fa6";

const QuestionsComponent = ({ type }: { type: string }) => {
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const blogsPerPage = 10;
  const isRTL = locale === "ar";
  const t = useTranslations("chat-request");
  const formatDate = useFormatDate();
  const { data: session, status } = useSession();
  const router = useRouter();
  const role = session?.user?.role;

  const {
    data: lawyerData,
    isLoading: lawyerIsLoading,
    isError: isLawyerError,
    error: errorLawyer,
  } = useQuery<ActivitiesResponse>({
    queryKey: ["lawyer-Requests", locale, type, currentPage, order],
    queryFn: () =>
      getRequestsLawyer(locale, type, currentPage, blogsPerPage, order),
    enabled: role === 1,
  });

  // Query for client data
  const { data, isLoading, isError, error } = useQuery<ActivitiesResponse>({
    queryKey: ["user-Requests", locale, type, currentPage, order],
    queryFn: () => getRequests(locale, type, currentPage, blogsPerPage, order),
    enabled: role === 2, // Only fetch if role is 2
  });

  const selectedData = role === 1 ? lawyerData : role === 2 ? data : null;
  const isSelectedLoading =
    role === 1 ? lawyerIsLoading : role === 2 ? isLoading : false;
  const isSelectedError =
    role === 1 ? isLawyerError : role === 2 ? isError : false;
  const selectedError = role === 1 ? errorLawyer : role === 2 ? error : null;

  const handleOrderChange = (value: "desc" | "asc") => {
    setOrder(value);
    setCurrentPage(1);
  };
  if (isSelectedLoading || status === "loading")
    return (
      <section className="lg:m-6 md:m-5 bg-white rounded-lg p-4">
        <div className="flex justify-start w-full my-4">
          <Skeleton className="w-[300px] h-10" />
        </div>
        <div className="bg-[#FFFFFF] rounded-lg shadow-lg flex justify-center max-w-6xl mx-auto container h-full">
          <div className="lg:p-8 md:p-6 p-4 max-w-5xl w-full flex flex-col lg:gap-8 md:gap-6 gap-4">
            <div className="flex flex-col gap-4 items-center">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-[#FFFFFF] rounded-lg shadow-md flex flex-col justify-center max-w-6xl mx-auto container gap-4 h-full lg:p-4 md:p-3 p-2 w-full"
                >
                  <div className="w-full flex justify-between">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );

  if (isSelectedError)
    return <section>Error: {selectedError?.message}</section>;
  if (!selectedData?.data?.data)
    return (
      <section className="h-screen flex justify-center items-center ">
        {t("no_data_available")}
      </section>
    );

  const request = selectedData.data.data;
  const totalJobs = request?.total ?? 0;

  return (
    <section>
      <div className="lg:m-6 md:m-4 m-0 bg-[#FFFFFF] rounded-lg shadow-md p-4">
        <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-8 md:gap-6 gap-4">
          <div className="lg:col-span-9 col-span-1 h-full ">
            <div className="flex md:flex-row flex-col gap-4 justify-between w-full my-4">
              <Select
                dir={isRTL ? "rtl" : "ltr"}
                onValueChange={handleOrderChange}
                value={order}
              >
                <SelectTrigger className="md:w-[300px] w-full relative focus:ring-0 select-trigger">
                  <SelectValue placeholder={t("sort_by")} />
                  <IoFilter
                    className={`custom-icon absolute ${
                      isRTL ? "left-3" : "right-3"
                    } top-1/2 transform -translate-y-1/2 text-gray-500`}
                    size={20}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t("sort_by")}</SelectLabel>
                    <SelectItem value="desc">{t("newest")}</SelectItem>
                    <SelectItem value="asc">{t("oldest")}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {role === 2 && (
                <Button
                  onClick={() => router.push("/send-question")}
                  className="bg-secondary hover:bg-secondary-dark"
                >
                  <IoIosAdd />
                  {t("question-request")}
                </Button>
              )}
            </div>
            <div className=" flex justify-center max-w-6xl mx-auto container h-full">
              <div className="lg:p-8 md:p-4 p-0 max-w-5xl w-full flex flex-col lg:gap-8 md:gap-6 gap-4">
                <div className="flex flex-col gap-4 items-center">
                  {request?.data.map((call: HireRequest) => (
                    <Link
                      href={`/dashboard/questions-request/${call.id}`}
                      className="bg-[#FFFFFF] rounded-lg shadow-md flex flex-col justify-center max-w-6xl mx-auto container gap-4 h-full lg:p-4 p-3 "
                      key={call.id}
                    >
                      <div className="w-full flex flex-wrap justify-between">
                        <span className="text-primary flex gap-2 w-full text-lg items-center font-[500] shrink-0">
                          <FaCircleQuestion size={25} />
                          <p>{t("question-request")}</p>
                        </span>
                        <p className="w-full text-lg justify-end flex text-secondary font-[500]">
                          {formatDate(call.created_at, locale)}
                        </p>
                      </div>
                      <div className="text-secondary font-[500] flex flex-col gap-1 text-lg">
                        <h2>{call.message}</h2>
                        <h2>{call.summary}</h2>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="md:my-6 my-4">
                  <CustomPagination
                    currentPage={currentPage}
                    totalItems={totalJobs}
                    itemsPerPage={blogsPerPage}
                    onPageChange={setCurrentPage}
                    maxPagesToShow={4}
                  />
                </div>
              </div>
            </div>
          </div>
          <ActiveLawyers />
        </div>
      </div>
    </section>
  );
};

export default QuestionsComponent;
