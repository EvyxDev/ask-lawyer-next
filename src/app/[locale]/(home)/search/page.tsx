"use client";
import { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocale, useTranslations } from "next-intl";
import { fetchSearchResults, getblogCategory } from "@/lib/apis/home";
import SearchBlog from "@/components/search/SearchBlog";
import { loader } from "../../../../../public/assets";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LawyerCard from "./LawyerCard";
import { useQuery } from "@tanstack/react-query";
import { getlegalFileds } from "@/lib/apis/requestform";
import { IoClose, IoFilter } from "react-icons/io5";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("blogs");
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [legalFieldId, setLegalFieldId] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations();
  const types = [
    { id: 1, type: "blogs", label: t("blogs") },
    { id: 2, type: "lawyers", label: t("lawyers") },
    { id: 3, type: "companies", label: t("companies") },
  ];
  const locale = useLocale();
  const isRTL = locale === "ar";

  const direction = locale === "ar" ? "rtl" : "ltr";
  const { data: legalFiledsData } = useQuery({
    queryKey: ["legal-Fileds", locale],
    queryFn: () => getlegalFileds(locale),
  });
  const { data: blogsCategories = [] } = useQuery({
    queryKey: ["blog-Categories", locale],
    queryFn: () => getblogCategory(locale),
  });

  // Debouncing
  useEffect(() => {
    const handler = debounce((term: string) => {
      setDebouncedSearchTerm(term);
    }, 700);

    const currentTimeout = debounceRef.current;

    handler(searchTerm);

    return () => {
      if (currentTimeout) clearTimeout(currentTimeout);
    };
  }, [searchTerm]);

  // Reset filters when switching types
  useEffect(() => {
    if (selectedType !== "lawyers") {
      setSortOption(null);
      setLegalFieldId(null);
    }
    if (selectedType !== "blogs") {
      setCategoryId(null);
    }
  }, [selectedType]);

  // Clear all filters
  const clearFilters = () => {
    setSortOption(null);
    setLegalFieldId(null);
    setCategoryId(null);
    setSearchTerm("");
    setDebouncedSearchTerm("");
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: [
      "search",
      debouncedSearchTerm,
      selectedType,
      sortOption ?? "",
      legalFieldId ?? "",
      categoryId ?? "",
    ],
    queryFn: fetchSearchResults,
    initialPageParam: 1,
    getNextPageParam: (lastPage: ApiResponse) => {
      const { current_page, last_page } = lastPage.pagination;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    enabled: !!debouncedSearchTerm,
  });

const allResults = (data?.pages.flatMap((page) => page.data || []) || []) as unknown as SearchResult[];
  return (
    <div className="container mx-auto max-w-7xl p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        {t("search_title")}
      </h1>
      <div className="relative mb-4 max-w-lg mx-auto">
        <Search
          className="absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <Input
          type="text"
          placeholder={t("search_placeholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ps-6 w-full rounded-full border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary shadow-sm border-2 h-12"
        />
      </div>
      <div className="relative mb-4 max-w-lg mx-auto flex items-center gap-2">
        <Select
          dir={direction}
          onValueChange={(value) => {
            const selected = types.find((type) => type.id.toString() === value);
            if (selected) setSelectedType(selected.type);
          }}
        >
          <SelectTrigger className="w-full rounded-full border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary shadow-sm border-2 !h-12 !py-6">
            <SelectValue placeholder={t("main_section")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t("main_section")}</SelectLabel>
              {types?.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <button
          onClick={clearFilters}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
          title={t("clear_filters")}
        >
          <IoClose size={20} />
        </button>
      </div>
      {selectedType === "lawyers" && (
        <>
          <div className="relative mb-4 max-w-lg mx-auto">
            <Select
              dir={isRTL ? "rtl" : "ltr"}
              onValueChange={(value) => {
                setSortOption(value);
                if (value !== "legal_field") {
                  setLegalFieldId(null);
                }
              }}
            >
              <SelectTrigger className="w-full rounded-full border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary shadow-sm border-2 !h-12">
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
                  <SelectItem value="most_active">
                    {t("sort_by_most_active")}
                  </SelectItem>
                  <SelectItem value="highest_rated">
                    {t("sort_by_highest_rated")}
                  </SelectItem>
                  <SelectItem value="legal_field">
                    {t("legal_field")}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {sortOption === "legal_field" && legalFiledsData && (
            <div className="relative mb-8 max-w-lg mx-auto">
              <Select
                dir={isRTL ? "rtl" : "ltr"}
                onValueChange={(value) => setLegalFieldId(value)}
              >
                <SelectTrigger className="w-full rounded-full border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary shadow-sm border-2 !h-12">
                  <SelectValue placeholder={t("select_legal_field")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t("legal_field")}</SelectLabel>
                    {(legalFiledsData?.data || []).map((field: City) => (
                      <SelectItem key={field.id} value={`${field.id}`}>
                        {field.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        </>
      )}
      {selectedType === "blogs" && blogsCategories.length > 0 && (
        <div className="relative mb-8 max-w-lg mx-auto">
          <Select
            dir={isRTL ? "rtl" : "ltr"}
            onValueChange={(value) => setCategoryId(value)}
          >
            <SelectTrigger className="w-full rounded-full border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary shadow-sm border-2 !h-12">
              <SelectValue placeholder={t("categories")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t("categories")}</SelectLabel>
                {blogsCategories.map(
                  (category: { id: string; name: string }) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
      {selectedType === "companies" && (
        <div className="relative mb-4 max-w-lg mx-auto">
          <Select
            dir={isRTL ? "rtl" : "ltr"}
            onValueChange={(value) => {
              setSortOption(value);
            }}
          >
            <SelectTrigger className="w-full rounded-full border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary shadow-sm border-2 !h-12">
              <SelectValue placeholder={t("sort_by")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t("sort_by")}</SelectLabel>
                <SelectItem value="most_active">
                  {t("sort_by_most_active")}
                </SelectItem>
                <SelectItem value="highest_rated">
                  {t("sort_by_highest_rated")}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center items-center h-[30vh]">
          <Image src={loader} height={150} width={150} alt="loading" />
        </div>
      )}
      {error && (
        <p className="text-red-500 text-center font-medium">
          خطأ: {(error as Error).message}
        </p>
      )}
      {allResults.length > 0 && (
        <InfiniteScroll
          dataLength={allResults.length}
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          loader={
            isFetchingNextPage && (
              <div className="flex justify-center items-center h-[30vh]">
                <Image src={loader} height={150} width={150} alt="loading" />
              </div>
            )
          }
          endMessage={
            <p className="text-center mt-4 text-gray-500">مفيش بيانات إضافية</p>
          }
        >
          {selectedType === "blogs" && <SearchBlog blogs={allResults} />}
          {selectedType === "lawyers" && (
            <LawyerCard
              lawyers={allResults || []}
              selectedType={selectedType}
            />
          )}
          {selectedType === "companies" && (
            <LawyerCard
              lawyers={allResults || []}
              selectedType={selectedType}
            />
          )}
        </InfiniteScroll>
      )}
    </div>
  );
}
