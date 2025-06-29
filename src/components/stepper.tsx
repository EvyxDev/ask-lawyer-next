/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Contact from "@/app/[locale]/(home)/request-price-offer/_components/Contact";
import OrderSummary from "@/app/[locale]/(home)/request-price-offer/_components/OrderSummary";
import { ContactForm } from "@/lib/schemes/types/Contact";
import { requestService } from "@/lib/apis/userRequests";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/i18n/routing";

interface StepProps {
  title: string;
  step: string;
  isCompleted?: boolean;
  isActive?: boolean;
  t: ReturnType<typeof useTranslations>;
}

// Step component
const Step: React.FC<StepProps> = ({
  step,
  title,
  isCompleted,
  isActive,
  t,
}) => {
  return (
    <div className="flex items-center flex-col gap-2">
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            "md:w-10 md:h-10 h-8 w-8 rounded-full border-2 flex items-center justify-center",
            isCompleted
              ? "border-primary bg-primary text-primary-foreground"
              : isActive
              ? "border-primary"
              : "border-muted border-2"
          )}
        >
          {isCompleted ? (
            <Check className="md:w-6 md:h-6 w-4 h-4" />
          ) : (
            <span className="text-sm font-medium">{step[0]}</span>
          )}
        </div>
      </div>
      {title && <p className="text-primary text-lg">{t(title)}</p>}
    </div>
  );
};

// StepperProps interface
interface StepperProps {
  steps: Array<{
    step: string;
    description?: React.ReactNode;
    title: string;
  }>;
  currentStep: number;
  onStepChange: (step: number) => void;
  service_id?: string; 
  lawyer_id?: string; 
}

// Stepper component
export function Stepper({ steps, currentStep, onStepChange , service_id ,lawyer_id }: StepperProps) {
  const t = useTranslations("service");
  const [isChecked, setIsChecked] = React.useState(false);
  const [formData, setFormData] = React.useState<ContactForm | null>(null);
  const [files, setFiles] = React.useState<File[]>([]);
  const [isFormValid, setIsFormValid] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
const router = useRouter()
  // useMutation لإرسال الـ request في خطوة الدفع
  const mutation = useMutation({
    mutationFn: (data: ContactForm & { files: File[] }) =>
      requestService({
        first_name: data.first_name,
        last_name: data.last_name,
        mobile: data.mobile,
        email: data.email,
        message: data.message,
        summary: data.summary,
        files: data.files,
        service_id: service_id, 
        lawyer_id: lawyer_id, 
      }),
    onSuccess: () => {
      toast("تم إرسال الطلب بنجاح", {
        className: "!bg-primary !text-white !border-primary",
      });
      router.push("/hire-lawyer")
    },
    onError: (error: Error) => {
      toast("حدث خطأ أثناء إرسال الطلب");
      console.error(error);
    },
  });

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleConfirm = () => {
    if (currentStep === 1 && isFormValid && formRef.current) {
      formRef.current.requestSubmit(); 
    } else if (currentStep === steps.length - 1 && formData) {
      mutation.mutate({ ...formData, files });
    } else {
      onStepChange(currentStep + 1);
    }
  };

  const handleContactSuccess = (data: ContactForm, contactFiles: File[]) => {
    setFormData(data); 
    setFiles(contactFiles); 
    onStepChange(currentStep + 1); 
  };

  const handleFormValidity = (valid: boolean) => {
    setIsFormValid(valid); 
  };

  const getDescription = (step: any) => {
    if (step.step === "2") {
      return (
        <Contact
          onSuccess={handleContactSuccess}
          ref={formRef}
          onValidityChange={handleFormValidity}
        />
      );
    }
    if (step.step === "3") {
      return <OrderSummary data={formData} />;
    }
    return step.description;
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-row justify-around items-start md:items-center gap-4 mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.step}>
            <Step
              step={step.step}
              title={step.title}
              isCompleted={index < currentStep}
              isActive={index === currentStep}
              t={t}
            />
          </React.Fragment>
        ))}
      </div>

      <div className="lg:m-8 md:m-6 m-4 border-2 shadow-sm">
        {getDescription(steps[currentStep])}
      </div>

      <div className="flex justify-between">
        {currentStep > 0 ? (
          <Button
            variant="outline"
            className="text-xl"
            type="button"
            onClick={() => onStepChange(currentStep - 1)}
          >
            {t("Previous")}
          </Button>
        ) : (
          <div className="flex items-center gap-2 text-[#49AE40] cursor-pointer">
            <input
              type="checkbox"
              id="terms"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-300 text-[#49AE40] bg-[#49AE40] focus:ring-[#49AE40] cursor-pointer"
            />
            <label
              htmlFor="terms"
              className="md:text-md text-sm font-semibold text-[#49AE40]"
            >
              {t("acceptTermsOfService")}
            </label>
          </div>
        )}
        <Button
          className="text-xl"
          onClick={handleConfirm}
          disabled={
            (currentStep === 0 && !isChecked) || // تعطيل لو الشروط مش متعلمة
            (currentStep === 1 && !isFormValid) || // تعطيل لو الفورم مش فاليد
            (currentStep === steps.length - 1 &&
              (!formData || mutation.isPending)) // تعطيل لو مفيش بيانات أو الـ request بيتبعت
          }
          type="button"
        >
          {currentStep === steps.length - 1
            ? mutation.isPending
              ? t("loading") // نعرض "جاري الإرسال" لو الـ request بيتبعت
              : t("pay_now")
            : t("next")}
        </Button>
      </div>
    </div>
  );
}
