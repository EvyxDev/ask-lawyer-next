"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import LawerForgotPassword from "../_authComponents/LawerForgotPassword";
import UserForgotPassword from "../_authComponents/UserForgotPassword";
import { mainlogo } from "../../../../../../public/assets";

const ForgotPassword = () => {
  const [activeTab, setActiveTab] = useState("");
  const t = useTranslations("Forgot-Password");
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem("activeTab", value);
  };

  return (
    <div className="w-full h-full border-[1px] 2xl:p-10 lg:p-8 p-6 bg-white rounded-lg font-bold mx-auto container shadow-sm m-10 ">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="flex justify-center items-center mb-6 w-full">
          <TabsList className="grid grid-cols-3 w-full gap-6 bg-transparent justify-center items-center h-12">
            <TabsTrigger
              value="client"
              className="w-auto h-9 cursor-pointer rounded-none font-normal !bg-transparent shadow-transparent text-secondary-dark lg:text-2xl text-xl data-[state=active]:text-primary data-[state=active]:font-bold transition-colors"
            >
              {t("client")}
            </TabsTrigger>
            <TabsTrigger
              value="consultant"
              className="w-auto h-9 cursor-pointer rounded-none font-normal !bg-transparent shadow-transparent text-secondary-dark lg:text-2xl text-xl data-[state=active]:text-primary data-[state=active]:font-bold transition-colors"
            >
              {t("consultant")}
            </TabsTrigger>
            <TabsTrigger
              value="lawyer"
              className="w-auto h-9 cursor-pointer rounded-none font-normal !bg-transparent shadow-transparent text-secondary-dark lg:text-2xl text-xl data-[state=active]:text-primary data-[state=active]:font-bold transition-colors"
            >
              {t("lawyer")}
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="flex-shrink-0 my-4 h-auto w-auto p-0 flex justify-center items-center">
          <Image
            src={mainlogo}
            alt="Main Logo"
            width={180}
            height={160}
            quality={100}
          />
        </div>
        <TabsContent value="client">
          <UserForgotPassword />
        </TabsContent>
        <TabsContent value="consultant">
          <LawerForgotPassword />
        </TabsContent>
        <TabsContent value="lawyer">
          <LawerForgotPassword />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ForgotPassword;
