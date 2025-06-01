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
interface RatingDialogProps {
  requestId: number;
  serviceId: number;
}

export default function RatingDialog({
  requestId,
  serviceId,
}: RatingDialogProps) {
  console.log(requestId);
  console.log(serviceId);
  const t = useTranslations("HireRequest");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call to submit rating
      // Replace with actual API call to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(`${t("rating.successMessage")}`, {
        className: "!bg-primary !text-white !border-primary",
      });
    } catch (error) {
      toast.error(`${error}`, {
        className: "!bg-red-400 !text-white !border-red-500",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="flex flex-col items-center space-y-4">
          <Label className=" text-md">{t("clickrate")}</Label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-9 w-9 cursor-pointer  ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-yellow-400"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <Label className=" text-md">{t("commentLabel")}</Label>
          <Textarea className="min-h-28" />
          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? t("rating.submitting") : t("rating.submitRating")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
