"use client";
import ActiveLawyers from "@/components/ActiveLawyers";
import { Stepper } from "@/components/stepper";
import { useState } from "react";
import TermsAndConditions from "../_components/TermsAndConditions";
import Contact from "../_components/Contact";
import OrderSummary from "../_components/OrderSummary";
import DueAmount from "../_components/DueAmount";
import { ContactForm } from "@/lib/schemes/types/Contact";

export default function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ContactForm | null>(null);

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
            />
          </div>
          <ActiveLawyers />
        </div>
      </div>
    </section>
  );
}