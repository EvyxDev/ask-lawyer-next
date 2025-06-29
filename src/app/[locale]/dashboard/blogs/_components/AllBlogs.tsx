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
  import { Link, useRouter } from "@/i18n/routing";
  import useFormatDate from "@/hooks/useFormatDate";
  import { Skeleton } from "@/components/ui/skeleton";
  import { Button } from "@/components/ui/button";
  import { IoIosAdd } from "react-icons/io";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { getBlogs } from "@/lib/apis/blogs";
import { FaEye } from "react-icons/fa";

  const AllBlogs = () => {
    const locale = useLocale();
    const [currentPage, setCurrentPage] = useState(1);
    const [order, setOrder] = useState<"desc" | "asc">("desc");
    const blogsPerPage = 10;
    const isRTL = locale === "ar";
    const t = useTranslations("requestpriceoffer");
    const formatDate = useFormatDate();
    const router = useRouter()
    const { data, isLoading, isError, error } = useQuery({
      queryKey: ["lawyer-blogs",  currentPage, order],
      queryFn: () => getBlogs( currentPage, blogsPerPage, order),
    });
    const handleOrderChange = (value: "desc" | "asc") => {
      setOrder(value);
      setCurrentPage(1);
    };

    if (isLoading)
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

    if (isError) return <section>Error: {error.message}</section>;
    if (!data?.data?.data) return <section>No job data available</section>;

    const request = data.data.data;
    const totalJobs = data.data?.total ?? 0;

    return (
      <section>
        <div className="lg:m-6 md:m-4 m-0 bg-[#FFFFFF] rounded-lg shadow-md p-4">
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
                <Button onClick={()=>{router.push("/dashboard/blogs/add-blog")}} className="bg-secondary hover:bg-secondary-dark">
                  <IoIosAdd />
                  {t("new_blog")}
                </Button>
              </div>
              <div className=" flex justify-center max-w-6xl mx-auto container h-full">
                <div className="lg:p-8 md:p-4 p-0 max-w-5xl w-full flex flex-col lg:gap-8 md:gap-6 gap-4">
                  <div className="flex flex-col gap-4 items-center">
                    {request?.map((job: Blog) => (
                      <Link
                        href={`/dashboard/blogs/${job.id}`}
                        className="bg-[#FFFFFF] rounded-lg shadow-md flex flex-col justify-center max-w-6xl mx-auto container gap-4 h-full lg:p-4 p-3 "
                        key={job.id}
                      >
                        <div className="w-full flex flex-wrap justify-between">
                          <div className="text-primary flex gap-2 w-full text-lg items-center font-[500] shrink-0">
                            <RiQuestionAnswerLine size={25} />
                            <p>{job.title}</p>
                          </div>
                          <div className="w-full flex flex-col">
                            <p className="w-full font-medium text-lg justify-end flex gap-2 items-center text-secondary ">
                              <FaEye className="text-primary"/>
                            {job.views}
                          </p>
                            <p className="w-full text-lg justify-end flex text-secondary font-[500]">
                            {formatDate(job.created_at, locale ?? "ar")}
                          </p>
                          </div>
                        </div>
                        <div className="text-secondary font-[500] flex flex-col gap-1 text-lg">
                          <h2>{job.description}</h2>
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
      </section>
    );
  };

  export default AllBlogs;
