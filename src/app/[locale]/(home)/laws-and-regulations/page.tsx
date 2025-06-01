"use client";

import Banner from "@/components/Banner";
import { useLocale, useTranslations } from "next-intl";
import { getBlogs } from "@/lib/apis/home";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { FaEye } from "react-icons/fa";

import { useState } from "react";

import { Link } from "@/i18n/routing";
import ActiveLawyers from "@/components/ActiveLawyers";
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
import useFormatDate from "@/hooks/useFormatDate";

interface Blog {
  id: number;
  title: string;
  description: string;
  views: number;
  created_at: string;
}
const LawsAndRegulations = () => {
  const t = useTranslations("legalInformation");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const blogsPerPage = 10;

  const {
    data: blogsData = { data: [], total: 0 },
    isLoading: isBlogsLoading,
  } = useQuery({
    queryKey: ["blog-laws_and_regulations", currentPage, order],
    queryFn: () => getBlogs(2, currentPage, blogsPerPage, order),
  });
const formatdate=  useFormatDate()

  const totalBlogs = blogsData?.total || 0;

  const handleOrderChange = (value: "desc" | "asc") => {
    setOrder(value);
    setCurrentPage(1);
  };
  return (
    <section>
      <Banner titleKey="legalInformation.laws_and_regulations" />
      <div className="flex flex-col lg:gap-6 gap-4 items-center justify-center">
        <div className="mx-auto container p-4 xl:m-8 lg:m-6 m-4 grid lg:grid-cols-12 grid-cols-1 lg:gap-6 gap-4 max-w-7xl">
          <div className="lg:col-span-8 col-span-1">
            <h2 className="my-6 lg:text-5xl text-4xl font-semibold text-background-dark">
              {t("laws_and_regulations")}
            </h2>
            <p className="text-[#666C89] xl:text-xl lg:text-lg text-md my-4">
              {t("legal_consultation_info")}
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
                    <SelectItem value="desc">{t("newest")}</SelectItem>
                    <SelectItem value="asc">{t("oldest")}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

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
                      <div className="text-primary flex gap-2 md:text-2xl text-xl">
                        <LuMessageCircleQuestion
                          className="shrink-0"
                          size={30}
                        />
                        <h2 className="break-after-all">{blog?.title}</h2>
                      </div>
                      <p className="md:text-2xl text-xl">{blog?.description}</p>
                    </div>
                    <div className="flex flex-col gap-2 md:me-8 me-2">
                      <span className="flex gap-2 items-center text-lg">
                        <FaEye className="text-primary" />
                        <p>{blog.views}</p>
                      </span>
                      <p className="font-normal text-lg whitespace-nowrap">{formatdate(blog.created_at, locale)}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Pagination Component - Always Visible */}
            <div className="mt-6">
              <CustomPagination
                currentPage={currentPage}
                totalItems={totalBlogs}
                itemsPerPage={blogsPerPage}
                onPageChange={setCurrentPage}
                maxPagesToShow={4}
              />
            </div>
          </div>
          <ActiveLawyers />
        </div>
      </div>
    </section>
  );
};

export default LawsAndRegulations;
