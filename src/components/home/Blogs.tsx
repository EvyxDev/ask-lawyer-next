"use client";

import { useLocale, useTranslations } from "next-intl";
import BlogCard from "./BlogCard";
import { getblogCategory, getBlogs } from "@/lib/apis/home";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Blogs() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

  useEffect(() => {
    if (categoryContainerRef.current) {
      categoryContainerRef.current.scrollLeft = 0;
    }
  }, []);
  const locale = useLocale(); 

  const { data: blogsCategories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["blog-Categories", locale], 
    queryFn: () => getblogCategory(locale), 
  });

  const { data: blogsData = [], isLoading: isBlogsLoading } = useQuery({
    queryKey: ["blogs", selectedCategoryId],
    queryFn: () => getBlogs(selectedCategoryId),
  });

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-12">
        <div className="flex gap-4 items-center">
          <h2 className="text-4xl md:text-5xl text-primary font-semibold">{t("blogs")}</h2>
          <div className="bg-secondary w-24 md:w-36 h-[6px] mt-4"></div>
        </div>
      </div>

      <div
        ref={categoryContainerRef}
        className="flex gap-2 mb-6 justify-start sm:justify-center items-center w-full overflow-x-auto md:px-0 px-4"
      >
        {isCategoriesLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-10 w-24 sm:w-32 shrink-0 rounded-md"
            />
          ))
        ) : (
          blogsCategories.map((cat: BlogCategory) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`px-2 py-1 sm:px-4 sm:py-2 text-primary hover:text-primary-dark font-semibold cursor-pointer shrink-0 ${
                selectedCategoryId === cat.id
                  ? "lg:text-4xl text-xl sm:text-3xl text-primary-dark"
                  : "lg:text-3xl text-lg sm:text-2xl"
              }`}
            >
              {cat.name}
            </button>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isBlogsLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden">
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
        ) : blogsData.data?.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <p className="text-2xl text-gray-600 mb-2">
              {t("noBlogsMessage", { defaultMessage: "No blogs available for this category." })}
            </p>
          </div>
        ) : (
          blogsData.data?.map((blog: Blog) => (
            <BlogCard
              key={blog.id}
              image={blog.image}
              created_at={blog.created_at || ""}
              title={blog.title}
              description={blog.description}
              id={blog.id}
              views={0}
            />
          ))
        )}
      </div>
    </section>
  );
}