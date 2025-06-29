"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TbBriefcase2Filled } from "react-icons/tb";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptHireEmployee, completeHireEmployee } from "@/lib/apis/rating";
import { ClientImage } from "./ClientImage";
import { useState } from "react";

export default function RequestDialog({ request }: { request: HireRequest }) {
  const requestId = request.id;
  const t = useTranslations("HireRequest");
  const queryClient = useQueryClient();
  const locale = useLocale();
const [isOpen, setIsOpen] = useState(false);
  // Mutation for accepting hire request
  const { mutate: acceptMutate, isPending: isAccepting } = useMutation({
    mutationFn: () => acceptHireEmployee(String(requestId)),
    onSuccess: () => {
      toast.success(t("accept.successMessage"), {
        className: "!bg-primary !text-white !border-primary",
      });
      queryClient.invalidateQueries({ queryKey: ["Hire_Requests"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || t("accept.errorMessage"), {
        className: "!bg-red-400 !text-white !border-red-500",
      });
    },
  });

  // Mutation for completing hire request
  const { mutate: completeMutate, isPending: isCompleting } = useMutation({
    mutationFn: () => completeHireEmployee(String(requestId)),
    onSuccess: () => {
      toast.success(t("complete.successMessage"), {
        className: "!bg-primary !text-white !border-primary",
      });
      setIsOpen(false); 
      queryClient.invalidateQueries({ queryKey: ["Hire_Requests"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || t("complete.errorMessage"), {
        className: "!bg-red-400 !text-white !border-red-500",
      });
    },
  });
const handleClose = () => {
    setIsOpen(false); 
  };
  const handleAccept = (e: React.FormEvent) => {
    e.preventDefault();
    acceptMutate();
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    completeMutate();
  };

  const translation = request.service.translations.find(
    (t) => t.locale === locale
  );
  const serviceName = translation?.name || request.service.name;
  const serviceDescription =
    translation?.description || request.service.description;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        <TbBriefcase2Filled className="h-5 w-5 me-2 text-primary" />
        {t("the-service")}
      </h3>
      <div className="border-[1px] shadow-sm p-3 rounded-md">
        <div className="flex items-center gap-4">
          {request.service.icon && (
            <ClientImage
              width={60}
              height={60}
              src={request.service.icon}
              alt={serviceName || "Service icon"}
              className="object-contain rounded-md"
            />
          )}
          <h3 className="text-xl font-medium">{serviceName}</h3>
        </div>
        <p className="text-[#666C89] mt-2">{serviceDescription}</p>
        {request.service.price && (
          <div className="w-full flex justify-end">
            <p className="text-md text-[#666C89]">
              <span className="bg-primary text-white p-1 rounded-md">
                $ {request.service.price}
              </span>
            </p>
          </div>
        )}
      </div>

<Dialog open={isOpen} onOpenChange={setIsOpen}>        <DialogTrigger asChild>
          {request.status !== "completed" && (
            <div className="w-full flex justify-center">
              <Button
                variant="outline"
                className="mt-2 bg-secondary hover:bg-secondary-dark !text-white w-48"
              >
                {request.status === "accepted" ? t("end") : t("start")}
              </Button>
            </div>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-xl flex items-center gap-2 m-3">
              <TbBriefcase2Filled className="h-5 w-5" />
              {t("lawyer_hiring_requests")}
            </DialogTitle>
            <p className="text-secondary text-start text-lg">
              {request.status === "accepted"
                ? t("complete.confirm")
                : t("accept.confirm")}
            </p>
          </DialogHeader>
          <form
            onSubmit={
              request.status === "accepted" ? handleComplete : handleAccept
            }
          >
            <div className="w-full flex items-center gap-4">
              <Button
                variant="outline"
                type="button"
                className="w-1/2 border-secondary-dark"
                onClick={handleClose}
              >
                {t("no")}
              </Button>
              <Button
                type="submit"
                className="w-1/2 bg-secondary hover:bg-secondary-dark"
                disabled={isAccepting || isCompleting}
              >
                {isAccepting || isCompleting ? t("loading") : t("yes")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
