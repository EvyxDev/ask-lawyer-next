"use client";

import Banner from "@/components/Banner";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { FaCrown } from "react-icons/fa6";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import ActiveLawyers from "@/components/ActiveLawyers";
import { IoMdStar } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoFilter, IoPersonCircleOutline } from "react-icons/io5";
import { getLawyers } from "@/lib/apis/lawyers";
import { ClientImage } from "@/components/ClientImage";
import { MdOutlineWork } from "react-icons/md";
import { useRouter } from "@/i18n/routing";

const Lawyers = () => {
  const t = useTranslations("lawyer");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const lawyersPerPage = 9;
  const router = useRouter();

  const {
    data: apiResponse,
    isLoading: isLawyersLoading,
    error,
  } = useQuery({
    queryKey: ["lawyers", currentPage, order],
    queryFn: () => getLawyers(order, currentPage, lawyersPerPage, order),
  });

  const lawyersData = apiResponse?.data || [];
  const totalPages = apiResponse?.pagination?.last_page || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOrderChange = (value: "desc" | "asc") => {
    setOrder(value);
    setCurrentPage(1);
  };
  if (error) {
    return (
      <div className="col-span-full text-center py-10">
        <p className="text-2xl text-red-600">
          {t("errorMessage", {
            defaultMessage: "Failed to load lawyers. Please try again later.",
          })}
        </p>
      </div>
    );
  }

  return (
    <section>
      <Banner titleKey="lawyer.lawyers" />
      <div className="flex flex-col lg:gap-6 gap-4 items-center justify-center">
        <div className="mx-auto container max-w-7xl p-4 xl:m-8 lg:m-6 m-4 grid lg:grid-cols-12 grid-cols-1 gap-6">
          <div className="lg:col-span-9 col-span-1">
            <h2 className="my-6 lg:text-5xl text-4xl font-semibold text-background-dark">
              {t("lawyers")}
            </h2>
            <p className="text-[#666C89] xl:text-xl lg:text-lg text-md my-4">
              {t("lawyers_info")}
            </p>
            <div className="flex justify-end w-full my-4">
              <Select
                dir={isRTL ? "rtl" : "ltr"}
                onValueChange={handleOrderChange}
                value={order}
              >
                <SelectTrigger className="w-[300px] relative focus:ring-0 select-trigger">
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
                    <SelectItem value="desc">{t("top_rated")}</SelectItem>
                    <SelectItem value="asc">{t("lowestRated")}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLawyersLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg overflow-hidden"
                  >
                    <Skeleton className="h-56 w-full" />
                    <div className="p-5 shadow">
                      <div className="flex items-center gap-2 mb-3">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-6 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </div>
                ))
              ) : lawyersData.length === 0 ? (
                <div className="col-span-full text-center py-10">
                  <p className="text-2xl text-gray-600 mb-2">
                    {t("noLawyersMessage", {
                      defaultMessage: "No lawyers available for this category.",
                    })}
                  </p>
                </div>
              ) : (
                lawyersData.map((lawyer: Lawyers) => (
                  <div
                    className="bg-white rounded-lg  overflow-hidden"
                    key={lawyer.id}
                  >
                    <div className="relative h-56 w-full">
                      <ClientImage
                        fill
                        src={lawyer.img || "/placeholder-lawyer.jpg"}
                        alt={lawyer.name}
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="p-4 shadow border-2">
                      <div className="flex justify-between my-1 border-b-[2px] border-b-gray-700 ">
                        <h3 className="text-xl font-bold  text-[#000000] truncate flex items-center gap-1">
                          {lawyer.name}
                          <FaCrown className="text-yellow-500" />
                        </h3>
                        <p className="text-xl font-bold  text-[#000000] truncate flex items-center gap-1">
                          <BiSolidBarChartAlt2 />

                          {lawyer.score_points}
                        </p>
                      </div>

                      <div className="flex justify-between my-1  ">
                        <h3 className="text-lg font-bold  text-[#000000] truncate flex items-center gap-1">
                          <IoPersonCircleOutline className=" text-xl" />

                          {lawyer.title}
                        </h3>
                        <p className="text-lg font-bold   text-[#000000] truncate flex items-center gap-1">
                          <IoMdStar className="text-yellow-500 text-xl" />
                          {lawyer.rate}
                        </p>
                      </div>
                      <div className="flex justify-between my-1 ">
                        <p className="text-lg font-bold text-[#000000] flex items-center gap-1 flex-wrap my-1">
                          <MdLanguage className="text-xl" />
                          {lawyer.languages.length > 0 ? (
                            lawyer.languages.map((field, index) => (
                              <span key={index}>
                                {field}
                                {index < lawyer.languages.length - 1 && " , "}
                              </span>
                            ))
                          ) : (
                            <span>N/A</span>
                          )}
                        </p>
                        <p className="text-lg font-bold   text-[#000000] truncate flex items-center gap-1">
                          <CiLocationOn className=" text-xl" />
                          {lawyer.country}
                        </p>
                      </div>

                      <p className="text-lg font-bold text-[#000000] flex items-center gap-1 flex-wrap my-1">
                        <MdOutlineWork className="text-xl" />
                        {lawyer.legal_fields.length > 0 ? (
                          lawyer.legal_fields.map((field, index) => (
                            <span key={index}>
                              {field}
                              {index < lawyer.legal_fields.length - 1 && " , "}
                            </span>
                          ))
                        ) : (
                          <span>N/A</span>
                        )}
                      </p>
                      <button
                        onClick={() => router.push(`/lawyers/${lawyer.id}`)}
                        className="bg-primary hover:bg-primary-dark  transition-all duration-700 text-white w-full rounded-md py-3 text-xl cursor-pointer"
                      >
                        {t("details")}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination Component */}
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1 || totalPages === 1}
                      className={`p-2 ${
                        currentPage === 1 || totalPages === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer hover:bg-gray-200 rounded"
                      }`}
                    >
                      <MdOutlineKeyboardDoubleArrowLeft
                        size={20}
                        className={isRTL ? "transform scale-x-[-1]" : ""}
                      />
                    </button>
                  </PaginationItem>
                  <PaginationItem>
                    <button
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1 || totalPages === 1}
                      className={`p-2 ${
                        currentPage === 1 || totalPages === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer hover:bg-gray-200 rounded"
                      }`}
                    >
                      <MdOutlineKeyboardArrowLeft
                        size={20}
                        className={isRTL ? "transform scale-x-[-1]" : ""}
                      />
                    </button>
                  </PaginationItem>

                  {(() => {
                    const maxPagesToShow = 4;
                    let startPage = Math.max(
                      1,
                      currentPage - Math.floor(maxPagesToShow / 2)
                    );
                    const endPage = Math.min(
                      startPage + maxPagesToShow - 1,
                      totalPages
                    );

                    if (endPage - startPage + 1 < maxPagesToShow) {
                      startPage = Math.max(1, endPage - maxPagesToShow + 1);
                    }

                    const pageNumbers = [];
                    for (let i = startPage; i <= endPage; i++) {
                      pageNumbers.push(
                        <PaginationItem key={i}>
                          <PaginationLink
                            onClick={() => handlePageChange(i)}
                            isActive={currentPage === i}
                            className={`cursor-pointer ${
                              currentPage === i
                                ? "bg-secondary text-white hover:bg-secondary-dark hover:text-white"
                                : "bg-transparent text-black hover:bg-gray-200"
                            }`}
                          >
                            {i}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    if (endPage < totalPages) {
                      if (endPage < totalPages - 1) {
                        pageNumbers.push(
                          <PaginationItem key="ellipsis">
                            <span className="px-3">...</span>
                          </PaginationItem>
                        );
                      }
                      pageNumbers.push(
                        <PaginationItem key={totalPages}>
                          <PaginationLink
                            onClick={() => handlePageChange(totalPages)}
                            isActive={currentPage === totalPages}
                            className="cursor-pointer"
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    return pageNumbers;
                  })()}

                  <PaginationItem>
                    <button
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages || totalPages === 1}
                      className={`p-2 ${
                        currentPage === totalPages || totalPages === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer hover:bg-gray-200 rounded"
                      }`}
                    >
                      <MdOutlineKeyboardArrowRight
                        size={20}
                        className={isRTL ? "transform scale-x-[-1]" : ""}
                      />
                    </button>
                  </PaginationItem>
                  <PaginationItem>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages || totalPages === 1}
                      className={`p-2 ${
                        currentPage === totalPages || totalPages === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer hover:bg-gray-200 rounded"
                      }`}
                    >
                      <MdOutlineKeyboardDoubleArrowRight
                        size={20}
                        className={isRTL ? "transform scale-x-[-1]" : ""}
                      />
                    </button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
          <ActiveLawyers />
        </div>
      </div>
    </section>
  );
};

export default Lawyers;
