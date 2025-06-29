"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ClientForm from "../_authComponents/ClientForm";
import LawyerForm from "../_authComponents/LawyerForm";
import ConsultantForm from "../_authComponents/ConsultantForm";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const t = useTranslations("login");

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
              value="lawyer"
              className="w-auto h-9 cursor-pointer rounded-none font-semibold !bg-transparent shadow-transparent text-secondary-dark xl:text-2xl lg:text-xl md:text-lg text-md xl:data-[state=active]:text-3xl lg:data-[state=active]:text-2xl data-[state=active]:text-xl data-[state=active]:text-primary data-[state=active]:font-bold transition-colors"
            >
              {t("lawyer")}
            </TabsTrigger>
            <TabsTrigger
              value="consultant"
              className="w-auto h-9 cursor-pointer rounded-none font-semibold !bg-transparent shadow-transparent text-secondary-dark xl:text-2xl lg:text-xl md:text-lg text-md xl:data-[state=active]:text-3xl lg:data-[state=active]:text-2xl data-[state=active]:text-xl data-[state=active]:text-primary data-[state=active]:font-bold transition-colors"
            >
              {t("consultant")}
            </TabsTrigger>
            <TabsTrigger
              value="client"
              className="w-auto h-9 cursor-pointer rounded-none font-semibold !bg-transparent shadow-transparent text-secondary-dark xl:text-2xl lg:text-xl md:text-lg text-md xl:data-[state=active]:text-3xl lg:data-[state=active]:text-2xl data-[state=active]:text-xl data-[state=active]:text-primary data-[state=active]:font-bold transition-colors"
            >
              {t("client")}
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="lawyer">
          <LawyerForm />
        </TabsContent>
        <TabsContent value="consultant">
          <ConsultantForm />
        </TabsContent>
        <TabsContent value="client">
          <ClientForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
