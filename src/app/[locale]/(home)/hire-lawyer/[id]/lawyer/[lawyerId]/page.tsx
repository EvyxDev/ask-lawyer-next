"use client";
import ActiveLawyers from "@/components/ActiveLawyers";
import { Stepper } from "@/components/stepper";
import { useState } from "react";
import { ContactForm } from "@/lib/schemes/types/Contact";
import TermsAndConditions from "@/app/[locale]/(home)/request-price-offer/_components/TermsAndConditions";
import DueAmount from "@/app/[locale]/(home)/request-price-offer/_components/DueAmount";
import OrderSummary from "@/app/[locale]/(home)/request-price-offer/_components/OrderSummary";
import Contact from "@/app/[locale]/(home)/request-price-offer/_components/Contact";
import { useParams } from "next/navigation";
import { getPlatformService } from "@/lib/apis/requestServiceform";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export default function LawyerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ContactForm | null>(null);
  const params = useParams();
  const locale = useLocale();
  const serviceId = Array.isArray(params.id) ? params.id[0] : params.id;
  const lawyerId = Array.isArray(params.lawyerId)
    ? params.lawyerId[0]
    : params.lawyerId;

  const { data: PlatformServiceData } = useQuery({
    queryKey: ["Platform-Service", locale, serviceId as string],
    queryFn: () => {
      return getPlatformService(locale, serviceId as string);
    },
    enabled: !!serviceId,
  });

  const steps = [
    {
      step: "1",
      title: "terms",
      description: <TermsAndConditions />,
    },
    {
      step: "2",
      title: "contact",
      description: <Contact onSuccess={(data) => setFormData(data)} />,
    },
    {
      step: "3",
      title: "orderSummary",
      description: <OrderSummary data={formData} />,
    },
    {
      step: "4",
      title: "payment",
      description: <DueAmount price={PlatformServiceData?.data?.price} />,
    },
  ];

  return (
    <section>
      <div className="flex flex-col lg:gap-6 gap-4 items-center justify-center">
        <div className="mx-auto container max-w-7xl p-4 xl:m-8 lg:m-6 m-4 grid lg:grid-cols-12 grid-cols-1 gap-6">
          <div className="lg:col-span-9 col-span-1">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              service_id={serviceId}
              lawyer_id={lawyerId}
            />
          </div>
          <ActiveLawyers />
        </div>
      </div>
    </section>
  );
}
