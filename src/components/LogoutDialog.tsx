import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";
import { signOut } from "next-auth/react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

type LogoutDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LogoutDialog({ open, onOpenChange }: LogoutDialogProps) {
  const router = useRouter();
  const t = useTranslations();
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      await signOut({ redirect: false });
      onOpenChange(false);
      router.push("/auth/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطأ غير معروف");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm flex flex-col gap-8 items-center text-center">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle className="text-center">
            {t("logout_confirm_title")}
          </DialogTitle>
          <DialogDescription>
            {error || t("logout_confirm_description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleLogout}>{t("logout")}</Button>
          <Button
            className="border-primary border-2 text-primary hover:bg-primary hover:text-white bg-transparent"
            onClick={() => onOpenChange(false)}
          >
            {t("cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
