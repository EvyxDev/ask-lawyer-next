import { useTranslations } from "next-intl";

const TermsAndConditions = () => {
  const t = useTranslations("service");
  return (
    <div className="p-4 flex flex-col gap-4  rounded-md">
      <h3 className="md:text-3xl text-2xl text-secondary font-medium mb-4">
        {t("termsAndConditions")}
      </h3>
      <p className="text-xl text-[#666C89]">{t("serviceHelpDescription")}</p>
      <p className="text-xl text-[#666C89]">
        {t("quotationGuaranteeDescription")}
      </p>
    </div>
  );
};

export default TermsAndConditions;
