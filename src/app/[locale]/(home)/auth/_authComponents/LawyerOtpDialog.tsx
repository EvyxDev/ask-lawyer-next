import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OtpregisterLawyer } from "@/lib/apis/auth";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";

// Define the props interface
interface OtpDialogProps {
  registeredEmail: string;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

// Zod schema for OTP validation
const OtpSchema = z.object({
  otp: z
    .string()
    .length(4, { message: "OTP must be exactly 4 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only digits" }),
});

type OtpFormData = z.infer<typeof OtpSchema>;

const LawyerOtpDialog: React.FC<OtpDialogProps> = ({
  registeredEmail,
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const t = useTranslations("register");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormData>({
    resolver: zodResolver(OtpSchema),
    defaultValues: { otp: "" },
  });

  const otpValue = watch("otp");

  const onSubmit = async (data: OtpFormData) => {
    try {
      await OtpregisterLawyer(registeredEmail, data.otp);
      setIsDialogOpen(false);
      toast.success(t("otp.success"), {
        className: "!bg-primary !text-white !border-primary",
      });
      router.push("/auth/login");
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("otp.error"));
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-lg">{t("otp.title")}</DialogTitle>
          <DialogDescription className="text-center text-lg">
            {t("otp.description")}{" "}
            <p className="text-primary">{registeredEmail}</p>
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 justify-center items-center"
        >
          <InputOTP
            maxLength={4}
            value={otpValue}
            onChange={(value) => setValue("otp", value)}
            
          >
            <InputOTPGroup className="rtl:flex-row-reverse">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          {errors.otp && (
            <p className="text-red-500 text-sm">{errors.otp.message}</p>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full text-xl font-semibold py-3" disabled={isSubmitting}>
            {isSubmitting ? t("otp.submitting") : t("otp.submit")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LawyerOtpDialog;
