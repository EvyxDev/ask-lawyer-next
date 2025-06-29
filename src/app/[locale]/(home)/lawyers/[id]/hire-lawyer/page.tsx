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

export default function LawyerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ContactForm | null>(null);
  const params = useParams();
  const lawyerId = Array.isArray(params.id) ? params.id[0] : params.id;

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
      description: <DueAmount />,
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
              lawyer_id={lawyerId}
            />
          </div>
          <ActiveLawyers />
        </div>
      </div>
    </section>
  );
}
