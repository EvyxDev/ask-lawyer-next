"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rateServiceRequest } from "@/lib/apis/rating";
import { useForm, SubmitHandler } from "react-hook-form";

export default function RatingDialog({ requestId }: { requestId: number }) {
  const t = useTranslations("HireRequest");
  const [rating, setRating] = useState(0);
const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<RateFormData>({
    defaultValues: {
      message: "",
      rating: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ rating, message }: RateFormData) =>
      rateServiceRequest(String(requestId), rating, message),
      onSuccess: () => {
      toast.success(t("rating.successMessage"), {
        className: "!bg-primary !text-white !border-primary",
      });
      reset();
      queryClient.invalidateQueries({ queryKey: ["Offer_User"] });
      setRating(0);
    },
    onError: (error: Error) => {
      toast.error(error.message || t("rating.errorMessage"), {
        className: "!bg-red-400 !text-white !border-red-500",
      });
    },
  });

  const onSubmit: SubmitHandler<RateFormData> = (data) => {
    mutate({
      message: data.message,
      rating: data.rating,
    });
  };

  const handleStarClick = (star: number) => {
    setRating(star);
    setValue("rating", star.toString(), { shouldValidate: true });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full flex justify-center">
          <Button
            variant="outline"
            className="mt-2 bg-secondary hover:bg-secondary-dark !text-white w-48"
          >
            {t("rating.submitButton")}
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {t("rating.dialogTitle")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center space-y-4">
            <Label className="text-md">{t("clickrate")}</Label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-9 w-9 cursor-pointer ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-yellow-400"
                  }`}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating.message}</p>
            )}

            <Label className="text-md">{t("commentLabel")}</Label>
            <Textarea {...register("message")} className="min-h-28" />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}

            <Button
              type="submit"
              disabled={rating === 0 || isPending}
              className="w-full"
            >
              {isPending ? t("rating.submitting") : t("rating.submitRating")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
