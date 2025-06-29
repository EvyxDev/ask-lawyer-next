"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CgProfile } from "react-icons/cg";
import { GoChecklist } from "react-icons/go";
import { GrKey } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { Link } from "@/i18n/routing";
import ChangeLanguage from "@/components/dashboard/ChangeLanguage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IconType } from "react-icons/lib";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/lib/apis/auth";
import { changePasswordSchema } from "@/lib/schemes/types/changePasswordSchema";
import { toast } from "sonner";

interface SettingsItem {
  id: number;
  name: string;
  url?: string;
  icon?: IconType;
}

const settingsData = [
  { id: 1, name: "profile", url: "/dashboard/profile", icon: CgProfile },
  {
    id: 2,
    name: "subscription_plan",
    url: "/dashboard/subscription-plan",
    icon: GoChecklist,
  },
  {
    id: 3,
    name: "reset-password",
    icon: GrKey,
  },
];

const SettingsList = () => {
  const t = useTranslations("settings-dashboard");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    current_password: false,
    new_password: false,
    new_password_confirmation: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<changePassword>({
    resolver: zodResolver(changePasswordSchema),

    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  // Mutation for form submission
  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success(t("password_updated"), {
        className: "!bg-primary !text-white !border-primary",
      });
      setIsDialogOpen(false);

      reset();
    },
    onError: (err) => {
      toast.error(t("error_updating_profile") + ": " + err, {
        className: "!bg-red-400 !text-white !border-red-500",
      });
    },
  });

  const onSubmit: SubmitHandler<changePassword> = (data) => {
    mutate({
      current_password: data.current_password,
      new_password: data.new_password,
      new_password_confirmation: data.new_password_confirmation,
    });
  };

  const handleItemClick = (item: SettingsItem) => {
    if (item.name === "reset-password") {
      setIsDialogOpen(true);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        {settingsData.map((data) => (
          <div
            key={data.id}
            onClick={() => handleItemClick(data)}
            className="rounded-md flex justify-between items-center shadow-sm cursor-pointer w-full p-4"
          >
            <div className="flex gap-2 w-full items-center">
              <span className="bg-primary p-3 rounded-full">
                {data.icon && <data.icon size={25} />}
              </span>
              <h2 className="text-primary text-xl font-extrabold">
                {t(data.name)}
              </h2>
            </div>
            {data.url ? (
              <Link href={data.url}>
                <IoIosArrowBack className="ltr:rotate-180" size={30} />
              </Link>
            ) : (
              <IoIosArrowBack className="ltr:rotate-180" size={30} />
            )}
          </div>
        ))}
        <ChangeLanguage />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-sm text-center w-full">
          <DialogHeader>
            <DialogTitle className="text-center">
              {t("reset-password")}
            </DialogTitle>
            <DialogDescription className="text-center">
              {t("reset-password-description") ||
                "Enter your current and new password to reset."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="current_password">{t("current_password")}</Label>
              <div className="relative">
                <Input
                  id="current_password"
                  type={
                    passwordVisibility.current_password ? "text" : "password"
                  }
                  className="border-b-2 shadow-0 rounded-none pe-10"
                  placeholder={t("current_password") || "Current Password"}
                  {...register("current_password")}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current_password")}
                  className="absolute end-2 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {passwordVisibility.current_password ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>
              </div>
              {errors.current_password && (
                <p className="text-red-500 text-sm">
                  {errors.current_password.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new_password">{t("new_password")}</Label>
              <div className="relative">
                <Input
                  id="new_password"
                  type={passwordVisibility.new_password ? "text" : "password"}
                  className="border-b-2 shadow-0 rounded-none pe-10"
                  placeholder={t("new_password") || "New Password"}
                  {...register("new_password")}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new_password")}
                  className="absolute end-2 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {passwordVisibility.new_password ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>
              </div>
              {errors.new_password && (
                <p className="text-red-500 text-sm">
                  {errors.new_password.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new_password_confirmation">
                {t("new_password_confirmation")}
              </Label>
              <div className="relative">
                <Input
                  id="new_password_confirmation"
                  type={
                    passwordVisibility.new_password_confirmation
                      ? "text"
                      : "password"
                  }
                  className="border-b-2 shadow-0 rounded-none pe-10"
                  placeholder={
                    t("new_password_confirmation") || "Confirm New Password"
                  }
                  {...register("new_password_confirmation")}
                />
                <button
                  type="button"
                  onClick={() =>
                    togglePasswordVisibility("new_password_confirmation")
                  }
                  className="absolute end-2 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {passwordVisibility.new_password_confirmation ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>
              </div>
              {errors.new_password_confirmation && (
                <p className="text-red-500 text-sm">
                  {errors.new_password_confirmation.message}
                </p>
              )}
            </div>

            <div className="flex justify-end mt-4 gap-4">
              <Button
                className="border-primary border-2 text-primary hover:bg-primary hover:text-white bg-transparent"
                type="button"
                onClick={() => setIsDialogOpen(false)}
              >
                {t("cancel") || "Cancel"}
              </Button>
              <Button disabled={isPending} type="submit">
                {isPending ? (
                  <span className="w-full flex justify-center items-center">
                    <FiLoader className="animate-spin duration-500 text-2xl text-white" />
                  </span>
                ) : (
                  t("submit")
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettingsList;
