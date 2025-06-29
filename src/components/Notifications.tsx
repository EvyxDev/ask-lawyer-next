"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoNotifications } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getNotificationLawyer } from "@/lib/apis/profile";
import Image from "next/image";
import { loader } from "../../public/assets";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/routing";

const Notifications = () => {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const { data: session, status } = useSession();
  const router = useRouter();
  const role = session?.user?.role;

  const dropdownAlign = locale === "ar" ? "start" : "end";

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["notifications-lawyer", role],
    queryFn: async ({ pageParam = 1 }) =>
      getNotificationLawyer(pageParam, 10, role),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage?.data?.total / 10);
      return allPages.length < totalPages ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1, 
    enabled: status === "authenticated",
  });

  const notifications =
    data?.pages.flatMap((page) => page.data?.data || []) ?? [];
  const total = data?.pages[0]?.data?.total || 0;

  const handleNotificationClick = (notification: Notification) => {
    switch (notification.type) {
      case "chat":
        router.push(`/dashboard/chat-requests/${notification.user_request_id}`);
        break;
      case "call":
        router.push(`/dashboard/calls-request/${notification.user_request_id}`);
        break;
      case "hireEmployee":
        router.push(
          `/dashboard/lawyer-job-applications/${notification.user_request_id}`
        );
        break;
      case "priceList":
        router.push(
          `/dashboard/request-price-offer/${notification.user_request_id}`
        );
        break;
      case "question":
        router.push(
          `/dashboard/questions-request/${notification.user_request_id}`
        );
        break;
      default:
        router.push(`/dashboard`);
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative fill-primary bg-none p-0">
          <IoNotifications size={30} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="lg:w-80 md:w-72 w-64 rounded-3xl shadow-none"
        align={dropdownAlign}
      >
        <DropdownMenuLabel className="text-primary text-xl font-semibold sticky top-0 bg-white z-10 ltr:text-left rtl:text-right">
          {t("notifications")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="lg:h-96 md:h-80 h-72 overflow-auto">
          {isLoading && (
            <div className="flex justify-center items-center h-[30vh]">
              <Image src={loader} height={100} width={100} alt="loading" />
            </div>
          )}

          {isError ? (
            <DropdownMenuItem className="text-center text-red-500">
              {t("errorLoadingNotifications")}
            </DropdownMenuItem>
          ) : notifications.length === 0 ? (
            <DropdownMenuItem className="text-center text-gray-500">
              {t("noNotifications")}
            </DropdownMenuItem>
          ) : (
            <>
              {notifications.map((notification) => (
                <DropdownMenuItem
                  onClick={() => handleNotificationClick(notification)}
                  key={notification.id}
                  className={`flex items-center gap-4 my-2 cursor-pointer ${
                    notification.is_read === 0 ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-md font-semibold">
                      {notification.title}
                    </span>
                    <span className="text-sm">{notification.body}</span>
                    <span className="text-sm text-gray-500 flex justify-end">
                      {notification.created_at}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}

              {hasNextPage && (
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-center">
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="w-full text-primary font-semibold cursor-pointer"
                  >
                    {isFetchingNextPage ? (
                      <div className="flex justify-center items-center h-[30vh]">
                        <Image
                          src={loader}
                          height={120}
                          width={120}
                          alt="loading"
                        />
                      </div>
                    ) : (
                      t("showMore")
                    )}
                  </button>
                </DropdownMenuItem>
              )}
            </>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="sticky bottom-0 bg-white z-10">
          <DropdownMenuItem className="text-center">
            <span className="w-full text-primary font-semibold cursor-pointer">
              ({total}) {t("total")}
            </span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
