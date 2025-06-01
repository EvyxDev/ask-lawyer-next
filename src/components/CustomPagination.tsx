"use client";
import { useLocale } from "next-intl";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

interface CustomPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  maxPagesToShow?: number;
}

const CustomPagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  maxPagesToShow = 4,
}: CustomPaginationProps) => {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPageNumbers = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

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
  };

  return (
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
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
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

        {renderPageNumbers()}

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
  );
};

export default CustomPagination;
