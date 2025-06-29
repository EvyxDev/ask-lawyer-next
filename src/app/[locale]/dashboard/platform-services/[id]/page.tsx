"use client";
import Banner from "@/components/Banner";
import { ClientImage } from "@/components/ClientImage";
import {
  acceptService,
  getPlatformService,
} from "@/lib/apis/requestServiceform";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { loader } from "../../../../../../public/assets";



interface PlatformService {
  id: string;
  name: string;
  description: string;
  icon: string;
  price?: string;
  max_price?: string;
  is_applied: boolean;
}

const PlatFormservicesDetails = () => {
  const params = useParams();
  const locale = useLocale()
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const queryClient = useQueryClient();
  const t = useTranslations();
  const { data: session, status } = useSession();

  const userId = session?.user?.CustomSession;
  const { data: PlatformServiceData } = useQuery({
    queryKey: ["Platform-Service", locale, id as string, userId as string],
    queryFn: () => getPlatformService(locale, id as string, userId as string),
    enabled: !!id,
  });

  const service: PlatformService = PlatformServiceData?.data;
  // Define Zod schema for price validation
  const schema = z.object({
    price: z
      .string()
      .nonempty(t("price_required"))
      .refine(
        (val) => {
          const num = parseFloat(val);
          const minPrice = service?.price ? parseFloat(service.price) : 0;
          const maxPrice = service?.max_price
            ? parseFloat(service.max_price)
            : Infinity;
          return !isNaN(num) && num >= minPrice && num <= maxPrice;
        },
        {
          message: t("price_range_error", {
            min: service?.price || "0",
            max: service?.max_price || "Infinity",
          }),
        }
      ),
  });

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      price: "",
    },
  });

  const acceptServiceMutation = useMutation({
    mutationFn: (data: { price: string }) =>
      acceptService(id as string, data.price),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Platform-Service", locale] });
      toast.success(t("service_accepted_successfully"), {
        className: "!bg-primary !text-white !border-primary",
      });
      reset();
    },
    onError: () => {
      toast.error(t("something_went_wrong"), {
        className: "!bg-red-400 !text-white !border-primary",
      });
    },
  });

  const onSubmit = (data: { price: string }) => {
    acceptServiceMutation.mutate(data);
  };

  // Show toast for validation errors
  if (errors.price) {
    toast.error(errors.price.message, {
      className: "!bg-red-400 !text-white !border-primary",
    });
  }
  if (status === "loading") {
    return<div className="flex justify-center items-center h-[30vh]">
          <Image src={loader} height={150} width={150} alt="loading" />
        </div>;
  }
  return (
    <section>
      <Banner titleKey="services" />
      <div className="flex flex-col lg:gap-6 gap-4 items-center ">
        <div className=" container max-w-5xl p-4 xl:m-8 lg:m-6 m-4  gap-6">
          <div className=" p-4 xl:m-9 lg:m-6 m-4 grid lg:grid-cols-12 grid-cols-1 gap-6">
            <div className="lg:col-span-5 col-span-1 w-full ">
              <ClientImage
                width={300}
                height={300}
                src={service?.icon}
                alt={service?.name}
                className=" object-cover rounded"
              />
            </div>
            <div className="lg:col-span-7 col-span-1 flex flex-col gap-4  w-full p-4 ">
              <h1 className="text-2xl font-bold">{service?.name}</h1>
              <p className="text-gray-600">{service?.description}</p>
              {service?.price && (
                <div className="text-md text-[#666C89] flex flex-col gap-2">
                  <span className="flex gap-2 items-center">
                    {t("Platform_Price")} :
                    <p className="bg-primary text-white p-1 rounded-md w-36 text-center">
                      $ {service?.price}
                    </p>
                  </span>

                  <span className="flex gap-2 items-center">
                    {t("max_pricing_amount")} :
                    <p className="bg-primary text-white p-1 rounded-md w-36 text-center">
                      $ {service?.max_price}
                    </p>
                  </span>

                  {service?.is_applied && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <span className="label">{t("service_price_input")}</span>
                      <input
                        {...register("price")}
                        placeholder={t("service_price_input")}
                        className={`peer w-full py-2 my-2 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                          errors.price ? "border-red-400" : ""
                        }`}
                      />
                      {errors.price && (
                        <p className="text-red-400 text-sm">
                          {errors.price.message}
                        </p>
                      )}
                      <div className="mt-auto flex justify-end w-full">
                        <button
                          type="submit"
                          disabled={acceptServiceMutation.isPending}
                          className="w-full text-center my-4 py-3 text-white rounded-md bg-secondary hover:bg-secondary-dark transition-all duration-700 text-lg cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {acceptServiceMutation.isPending
                            ? t("accepting")
                            : t("accept")}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatFormservicesDetails;
