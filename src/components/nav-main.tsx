"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { BsChatSquareDots } from "react-icons/bs";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { ChevronRight, Settings } from "lucide-react";
import { FaRegNewspaper } from "react-icons/fa";
import { Link, usePathname } from "@/i18n/routing";
import { Gavel, MessageCircleMore, MessageSquarePlus } from "lucide-react";
import { LuClipboardList } from "react-icons/lu";
import { BriefcaseBusiness } from "lucide-react";
import { LuLayoutGrid } from "react-icons/lu";
import { IoLayers } from "react-icons/io5";
import { useSession } from "next-auth/react";

export function NavMain() {
  const { data: session } = useSession();
  const userId = session?.user?.role;

  const items = [
    {
      title: "cases",
      url: "/dashboard",
      icon: Gavel,
      isActive: true,
      items: [
        {
          title: "request_offer",
          url: "/dashboard/request_offer",
          icon: MessageSquarePlus,
        },
        {
          title: "chat",
          url: "/dashboard/chat",
          icon: BsChatSquareDots,
        },
        {
          title: "questions",
          url: "/dashboard/questions",
          icon: RiQuestionAnswerLine,
        },
        {
          title: "calls",
          url: "/dashboard/calls",
          icon: FiPhoneCall,
        },
      ],
    },
    {
      title: "messages",
      url: "/dashboard",
      icon: MessageCircleMore,
      items: [
        {
          title: "questions",
          url: "#",
          icon: Gavel,
        },
        {
          title: "calls",
          url: "#",
          icon: Gavel,
        },
        {
          title: "chat",
          url: "#",
          icon: Gavel,
        },
      ],
    },
    {
      title: "blogs",
      url: "/dashboard/blogs",
      icon: FaRegNewspaper,
    },
    {
      title: "my-services",
      url: "/dashboard/my-services",
      icon: IoLayers,
    },
    {
      title: "Platform-Services",
      url: "/dashboard/platform-services",
      icon: LuLayoutGrid,
    },
    {
      title: "settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "activites",
      url: "/dashboard",
      icon: LuClipboardList,
      isActive: true,
      items: [
        {
          title: "lawyerJobApplications",
          url: "/dashboard/lawyer-job-applications",
          icon: BriefcaseBusiness,
        },
        {
          title: "request_offer",
          url: "/dashboard/request-price-offer",
          icon: MessageSquarePlus,
        },
        {
          title: "chat-requests",
          url: "/dashboard/chat-requests",
          icon: BsChatSquareDots,
        },
        {
          title: "questions_request",
          url: "/dashboard/questions-request",
          icon: RiQuestionAnswerLine,
        },
        {
          title: "call-requests",
          url: "/dashboard/calls-request",
          icon: FiPhoneCall,
        },
      ],
    },
  ];

  // Filter items based on userId
  const filteredItems = items.filter((item) => {
    if (userId === 2) {
      return !["blogs", "my-services", "Platform-Services"].includes(item.title);
    }
    return true; // Show all items for userId === "1" or other cases
  });

  const locale = useLocale();
  const isRTL = locale === "ar";
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {filteredItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            {item.items ? (
              <Collapsible
                defaultOpen={item.items.some(
                  (subItem) => pathname === subItem.url
                )}
                className="group/collapsible"
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={`rounded-none text-[#05244080] font-[700] py-5 text-xl hover:text-primary hover:bg-transparent ${
                      pathname === item.url ? "text-primary" : ""
                    }`}
                    tooltip={t(`sidebar.${item.title}`)}
                  >
                    {item.icon && <item.icon />}
                    <span>{t(`sidebar.${item.title}`)}</span>
                    <ChevronRight
                      className={`${
                        isRTL ? "mr-auto" : "ml-auto"
                      } transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 ${
                        isRTL ? "rotate-180" : ""
                      }`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          className={`!text-lg font-[600] ${
                            pathname === subItem.url ? "text-primary" : ""
                          }`}
                          asChild
                        >
                          <Link href={subItem.url}>
                            {subItem.icon && <subItem.icon />}
                            <span>{t(`sidebar.${subItem.title}`)}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuButton
                className={`rounded-none text-[#05244080] font-[700] py-5 text-xl hover:text-primary hover:bg-transparent ${
                  pathname === item.url ? "text-primary" : ""
                }`}
                tooltip={item.title}
                asChild
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{t(`sidebar.${item.title}`)}</span>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}