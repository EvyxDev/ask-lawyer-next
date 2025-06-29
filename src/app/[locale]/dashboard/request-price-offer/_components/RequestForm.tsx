"use client";
import { Button } from "@/components/ui/button";
import { sendRequestPrice } from "@/lib/apis/requestServiceform";
import { useTranslations } from "next-intl";
import { MdMoney } from "react-icons/md";
import { MdHomeRepairService } from "react-icons/md";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";

const RequestForm = ({ requestId }: { requestId: number }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<sendRequestPriceRequest>({
    defaultValues: {
      message: "",
      price: "",
    },
  });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ price, message }: sendRequestPriceRequest) =>
      sendRequestPrice({
        request_id: String(requestId),
        price,
        message,
      }),
    onSuccess: () => {
      toast.success(t("successMessage"), {
        className: "!bg-primary !text-white !border-primary",
      });
queryClient.invalidateQueries({ queryKey: ["Offer_Lawyer"] });    
  reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || t("errorMessage"), {
        className: "!bg-red-400 !text-white !border-red-500",
      });
    },
  });
  const onSubmit: SubmitHandler<sendRequestPriceRequest> = (data) => {
    mutate({
      message: data.message,
      price: data.price,
      request_id: String(requestId),
    });
  };

  const t = useTranslations("requestpriceofferRequest");
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <MdMoney className="h-6 w-6 me-2 text-primary " />
            {t("requested_amount")}
          </h3>
          <input
            className="peer w-28 py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
            placeholder="$$$$"
            type="number"
            {...register("price")}
          />
        </div>
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <MdHomeRepairService className="h-6 w-6 me-2 text-primary " />
            {t("the-service")}
          </h3>
          <textarea
            className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
            placeholder={t("the-service")}
            {...register("message")}
          />
        </div>
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message.message}</p>
        )}
        <div className="w-full flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="text-md py-5 cursor-pointer md:flex hidden gap-2 rounded-sm  hover:text-white bg-secondary hover:bg-secondary-dark text-white    w-28"
          >
            {isPending ? t("sending") : t("send")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
