"use client";

import Banner from "@/components/Banner";
import Image from "next/image";
import { lawyerIcon } from "../../../../public/assets";
import { useLocale, useTranslations } from "next-intl";
import { getBlogs } from "@/lib/apis/home";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Link } from "@/i18n/routing";

interface Blog {
  id: number;
  title: string;
  description: string;
  views: number;
  created_at: string;
}

const LegalDictionary = () => {
  const t = useTranslations("legalInformation");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;

  const {
    data: blogsData = { data: [], total: 0 },
    isLoading: isBlogsLoading,
  } = useQuery({
    queryKey: ["blog-legal-dictionary", currentPage],
    queryFn: () => getBlogs(1, currentPage, blogsPerPage),
  });

  const totalBlogs = blogsData?.total || 0;
  const totalPages = Math.ceil(totalBlogs / blogsPerPage) || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section>
      <Banner titleKey="legalInformation.legal_dictionary" />
      <div className="flex flex-col lg:gap-6 gap-4 items-center justify-center">
        <div className="mx-auto container p-4 xl:m-8 lg:m-6 m-4 grid lg:grid-cols-12 grid-cols-1 gap-4">
          <div className="lg:col-span-8 col-span-1">
            <h2 className="my-6 lg:text-5xl text-4xl font-semibold text-background-dark">
              {t("legal_dictionary")}
            </h2>
            <p className="text-[#666C89] xl:text-xl lg:text-lg text-md my-4">
              {t("legal_consultation_info")}
            </p>
            <div className="flex flex-col gap-4">
              {isBlogsLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg overflow-hidden"
                  >
                    <div className="p-5 shadow">
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </div>
                ))
              ) : blogsData.data.length === 0 ? (
                <div className="col-span-full text-center py-10">
                  <p className="text-2xl text-gray-600 mb-2">
                    {t("noBlogsMessage", {
                      defaultMessage: "No blogs available for this category.",
                    })}
                  </p>
                </div>
              ) : (
                blogsData.data.map((blog: Blog) => (
                  <Link
                    href={`blogs/${blog.id}`}
                    className="rounded-sm shadow-sm flex justify-between md:p-4 p-2 hover:bg-gray-50"
                    key={blog.id}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="text-primary flex gap-2 text-2xl">
                        <LuMessageCircleQuestion
                          className="shrink-0"
                          size={30}
                        />
                        <h2>{blog?.title}</h2>
                      </div>
                      <p className="text-2xl">{blog?.description}</p>
                    </div>
                    <div className="flex flex-col gap-2 md:me-8 me-2">
                      <span className="flex gap-2 items-center text-lg">
                        <FaEye className="text-primary" />
                        <p>{blog.views}</p>
                      </span>
                      <p className="font-normal text-lg">{blog.created_at}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Pagination Component - Always Visible */}
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  {/* First Page Arrow */}
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

                  {/* Previous Page Arrow */}
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

                    // Add ellipsis and last page if needed
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

                  {/* Next Page Arrow */}
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

                  {/* Last Page Arrow */}
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
          <div className="lg:col-span-4 col-span-1 bg-gray-50 rounded-md border-[1px] border-[#D8D8D8] p-4">
            <h2 className="my-6 lg:text-4xl text-3xl font-semibold text-background-dark">
              {t("active_lawyer")}
            </h2>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 shadow-md rounded-md bg-white p-2">
                <div className="rounded-full shrink-0">
                  <Image
                    alt="user photo"
                    width={20}
                    height={20}
                    className="rounded-full w-full"
                    src={lawyerIcon}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p>محمد احمد ابراهيم</p>
                  <p className="font-semibold">جمهورية مصر العربية</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalDictionary;
