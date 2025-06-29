"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptRequest, completeRequest } from "@/lib/apis/rating";
import { useState } from "react";
import { FaCircleQuestion } from "react-icons/fa6";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

type RateFormData = {
  message: string;
};

type AcceptDialogProps = {
  request: HireRequest;
  requestId: string;
};

export default function AcceptDialog({
  request,
  requestId,
}: AcceptDialogProps) {
  const t = useTranslations("HireRequest");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RateFormData>({
    defaultValues: {
      message: "",
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  // Mutation for accepting hire request
  const { mutate: acceptMutate, isPending: isAccepting } = useMutation({
    mutationFn: () => acceptRequest(String(requestId)),
    onSuccess: () => {
      toast.success(t("accept.successMessage"), {
        className: "!bg-primary !text-white !border-primary",
      });
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["question_Request"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || t("accept.errorMessage"), {
        className: "!bg-red-400 !text-white !border-red-500",
      });
    },
  });

  // Mutation for completing hire request
  const { mutate: completeMutate, isPending: isCompleting } = useMutation({
    mutationFn: (message: string) =>
      completeRequest(String(requestId), message),
    onSuccess: () => {
      toast.success(t("complete.successanswer"), {
        className: "!bg-primary !text-white !border-primary",
      });
      reset();
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

  const onSubmit = (data: RateFormData) => {
    if (request.status === "accepted") {
      completeMutate(data.message);
    } else {
      acceptMutate();
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {request.status !== "completed" && (
            <div className="w-full flex justify-center">
              <Button
                variant="outline"
                className="mt-2 bg-secondary hover:bg-secondary-dark !text-white w-48"
              >
                {request.status === "accepted"
                  ? t("answer")
                  : t("accept-request")}
              </Button>
            </div>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-xl flex items-center gap-2 m-3">
              <FaCircleQuestion className="h-5 w-5" />
              {t("lawyer_question_requests")}
            </DialogTitle>
            <p className="text-secondary text-start text-lg">
              {request.status === "accepted"
                ? t("complete.confirm")
                : t("accept.confirm")}
            </p>
            {request.status === "accepted" && (
              <>
                <span>
                  <p className="text-primary text-start text-lg">
                    {t("complete.answer")}
                  </p>
                </span>
                <p className="text-primary text-start text-lg">
                  {t("the_question")} {request.message}
                </p>
              </>
            )}
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            {request.status === "accepted" && (
              <Textarea
                {...register("message", {
                  required: t("message_required"),
                })}
                className="min-h-28"
              />
            )}
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
            <div className="w-full flex items-center gap-4 mt-4">
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
                {isAccepting || isCompleting ? t("loading") : t("send")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
