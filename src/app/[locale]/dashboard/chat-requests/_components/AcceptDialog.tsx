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
import { IoChatboxEllipses } from "react-icons/io5";

import { useState } from "react";
type AcceptDialogProps = {
  request: HireRequest;
  requestId: string;
};
export default function AcceptDialog({ request, requestId }: AcceptDialogProps) {
  const t = useTranslations("HireRequest");
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  // Mutation for accepting hire request
  const { mutate: acceptMutate, isPending: isAccepting } = useMutation({
    mutationFn: () => acceptRequest(String(requestId)),
    onSuccess: () => {
      toast.success(t("accept.successMessage"), {
        className: "!bg-primary !text-white !border-primary",
      });
      setIsOpen(false)
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
    mutationFn: () => completeRequest(String(requestId)),
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
                {request.status === "accepted" ? t("end-chat") : t("accept-request")}
              </Button>
            </div>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-xl flex items-center gap-2 m-3 text-secondary-dark">
              <IoChatboxEllipses  className="h-5 w-5" />
              {t("chat_requests")}
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
