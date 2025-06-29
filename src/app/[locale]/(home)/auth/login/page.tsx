"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { getLoginSchema, LoginFormType } from "@/lib/schemes/types/authSchema";
import { signIn } from "next-auth/react";
import { FiLoader } from "react-icons/fi";
import { getFCMToken } from "@/lib/fcm";
import { mainlogo } from "../../../../../../public/assets";
import Cookies from "js-cookie"; 
const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("login");

  const loginSchema = getLoginSchema({
    emailInvalid: t("errors.email.invalid"),
    emailRequired: t("errors.email.required"),
    passwordMin: t("errors.password.min"),
    passwordFormat: t("errors.password.format"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const getUserType = (tab: string) => {
    switch (tab) {
      case "client":
        return 2;
      case "consultant":
        return 1;
      case "lawyer":
        return 1;
      default:
        return 1;
    }
  };

  const onSubmit = async (data: LoginFormType) => {
    setError(null);
    try {
      const fcmToken = await getFCMToken(); 
      console.log(fcmToken)
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        user_type: getUserType(activeTab),
        fcm_token: fcmToken, 
        redirect: false,
      });
     
      if (result?.error) {
        setError(result.error);
      } else {
        Cookies.set("user_role", getUserType(activeTab).toString(), {
          expires: 7, 
          secure: process.env.NODE_ENV === "production", 
          sameSite: "Strict", 
        });
        router.push("/");
      }
      
    } catch (error) {
      setError(error instanceof Error ? error.message : "خطأ غير معروف");
    }
  };

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

  const renderForm = () => (
    <div className="rtl:text-right w-full flex flex-col justify-center gap-8 ">
      <div className="flex-shrink-0 my-4 h-auto w-auto p-0 flex justify-center items-center">
        <Image
          src={mainlogo}
          alt="Main Logo"
          width={180}
          height={160}
          quality={100}
        />
      </div>
      <h2 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl">{t("title")}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-8"
      >
        <div>
          <input
            type="email"
          className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
            placeholder={t("labels.email")}
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
          className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
            placeholder={t("labels.password")}
            {...register("password")}
          />
          <div
            className="absolute rtl:start-4 rtl:end-auto ltr:end-4 ltr:start-auto top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Link
          href="forgot-password"
          className="text-primary hover:text-primary-dark cursor-pointer"
        >
          {t("Forgot your password")}
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="lg:text-2xl md:text-xl text-lg cursor-pointer md:py-3 py-2 bg-background-dark hover:bg-secondary-dark w-full rounded-lg text-white"
        >
          {isSubmitting ? (
            <span className="w-full flex justify-center items-center">
              <FiLoader className="animate-spin duration-500 text-2xl text-primary" />
            </span>
          ) : (
            t("title")
          )}
        </button>
        <div className="w-full">
          <p>
            {t("Donthaveanaccount")}{" "}
            <Link
              href="register"
              className="text-primary hover:text-primary-dark cursor-pointer"
            >
              {t("Create an account")}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );

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
              className="w-auto h-9 cursor-pointer rounded-none font-semibold !bg-transparent shadow-transparent text-secondary-dark xl:text-2xl lg:text-xl md:text-lg text-md xl:data-[state=active]:text-3xl lg:data-[state=active]:text-2xl data-[state=active]:text-xl data-[state=active]:text-primary data-[state=active]:font-bold transition-colors"
            >
              {t("client")}
            </TabsTrigger>
            <TabsTrigger
              value="consultant"
              className="w-auto h-9 cursor-pointer rounded-none font-semibold !bg-transparent shadow-transparent text-secondary-dark xl:text-2xl lg:text-xl md:text-lg text-md xl:data-[state=active]:text-3xl lg:data-[state=active]:text-2xl data-[state=active]:text-xl data-[state=active]:text-primary data-[state=active]:font-bold transition-colors"
            >
              {t("consultant")}
            </TabsTrigger>
            <TabsTrigger
              value="lawyer"
              className="w-auto h-9 cursor-pointer rounded-none font-semibold !bg-transparent shadow-transparent text-secondary-dark xl:text-2xl lg:text-xl md:text-lg text-md xl:data-[state=active]:text-3xl lg:data-[state=active]:text-2xl data-[state=active]:text-xl data-[state=active]:text-primary data-[state=active]:font-bold transition-colors"
            >
              {t("lawyer")}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="client">{renderForm()}</TabsContent>
        <TabsContent value="consultant">{renderForm()}</TabsContent>
        <TabsContent value="lawyer">{renderForm()}</TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
