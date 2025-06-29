import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { registerlawyer } from "@/lib/apis/auth";
import {
  getRegisterLawyerSchema,
  RegisterLawyerSchemaType,
} from "@/lib/schemes/types/authSchema";
import type { Option } from "@/components/multi-select";

import {
  getCountries,
  getCities,
  getLanguages,
  getlegalFileds,
  getActiveCompanies,
} from "@/lib/apis/requestform";

import { toast } from "sonner";
import BasicInfoForm from "./BasicInfoForm";
import PersonalDetailsForm from "./PersonalDetailsForm";
import ImageUploadForm from "./ImageUploadForm";
import AccountTypeForm from "./AccountTypeForm";
import LawyerOtpDialog from "./LawyerOtpDialog";
const ConsultantForm = () => {
  const t = useTranslations("register");
  type RegisterLawyerType = RegisterLawyerSchemaType;
  const locale = useLocale();
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const direction = locale === "ar" ? "rtl" : "ltr";
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<Option[]>([]);
  const [selectedLegal, setSelectedLegal] = useState<Option[]>([]);
  const [activeTab, setActiveTab] = useState("free-lawyer");
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem("activeTab", value);
  };
  const [imagePreviews, setImagePreviews] = useState({
    img: null as string | null,
    photo_union_card: null as string | null,
    photo_office_rent: null as string | null,
    photo_passport: null as string | null,
    card_id_img: null as string | null,
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
    watch,
    setValue,
  } = useForm<RegisterLawyerType>({
    resolver: zodResolver(
      getRegisterLawyerSchema({
        emailRequired: t("errors.emailRequired"),
        emailInvalid: t("errors.emailInvalid"),
        nameRequired: t("errors.nameRequired"),
        passwordMin: t("errors.passwordMin"),
        passwordFormat: t("errors.passwordFormat"),
        passwordConfirmationMatch: t("errors.passwordConfirmationMatch"),
        imageInvalid: t("errors.imageInvalid"),
        titleRequired: t("errors.titleRequired"),
        mobileInvalid: t("errors.mobileInvalid"),
        addressRequired: t("errors.addressRequired"),
        countryRequired: t("errors.countryRequired"),
        cityRequired: t("errors.cityRequired"),
        languagesInvalid: t("errors.languagesInvalid"),
        languagesRequired: t("errors.languagesRequired"),
        legalFiledsInvalid: t("errors.legalFiledsInvalid"),
        legalFiledsRequired: t("errors.legalFiledsRequired"),
        medalsRequired: t("medalsRequired"),
        educationRequired: t("educationRequired"),
        registrationnumberRequired: t("registrationnumberRequired"),
        requiredField: t("requiredField"),
        activeTab,
        type: "3",
      })
    ),
    defaultValues: {
      email: "",
      password: "",
      address: "",
      password_confirmation: "",
      name: "",
      title: "",
      mobile: "",
      img: null,
      photo_union_card: null,
      card_id_img: null,
      photo_passport: null,
      photo_office_rent: null,
      city_id: "",
      country_id: "",
      type: "3",
      account_type: "individual",
      registration_number: "",
      education: "",
      medals: "",
      languages: [],
      legal_fields: [],
      bio_company: "",
      parent_id: "",
      name_company: "",
      website_company: "",
      linked_in_company: "",
      address_company: "",
      city_id_company: "",
      country_id_company: "",
    },
  });
  const selectedCountry = watch("country_id");
  const selectedCountryCompany = watch("country_id_company");
  const selectedCountryId = selectedCountry || selectedCountryCompany;

  const { data: countriesData } = useQuery({
    queryKey: ["Countries", locale],
    queryFn: () => getCountries(locale),
  });
  const { data: ActiveCompaniesData } = useQuery({
    queryKey: ["Active-Companies", locale],
    queryFn: () => getActiveCompanies(locale),
  });
  const { data: languagesData } = useQuery({
    queryKey: ["Languages", locale],
    queryFn: () => getLanguages(locale),
  });
  const { data: citiesData } = useQuery({
    queryKey: ["Cities", locale, selectedCountryId],
    queryFn: () => getCities(locale, selectedCountryId!),
    enabled: !!selectedCountryId,
  });
  const { data: legalFiledsData } = useQuery({
    queryKey: ["legal-Fileds", locale],
    queryFn: () => getlegalFileds(locale),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      email,
      password,
      password_confirmation,
      name,
      title,
      mobile,
      address,
      city_id,
      country_id,
      type,
      account_type,
      registration_number,
      education,
      medals,
      languages,
      legal_fields,
      photo_union_card,
      img,
      card_id_img,
      photo_passport,
      photo_office_rent,
      parent_id,
      name_company,
      bio_company,
      website_company,
      address_company,
      country_id_company,
      city_id_company,
      linked_in_company,
    }: RegisterLawyerType) =>
      registerlawyer(
        email,
        password,
        password_confirmation,
        name,
        title,
        mobile,
        address,
        city_id,
        country_id,
        type,
        account_type,
        registration_number,
        education,
        medals,
        languages,
        legal_fields,
        photo_union_card,
        img,
        card_id_img,
        photo_passport,
        photo_office_rent,
        parent_id,
        name_company,
        bio_company,
        website_company,
        address_company,
        country_id_company,
        city_id_company,
        linked_in_company
      ),
    onSuccess: (data, variables) => {
      reset();
      setServerErrors(null);
      setRegisteredEmail(variables.email);
      setIsDialogOpen(true);
      setImagePreviews({
        img: null,
        photo_union_card: null,
        photo_office_rent: null,
        photo_passport: null,
        card_id_img: null,
      });
    },
    onError: (err) => {
      if (err instanceof Error) {
        try {
          const parsedErrors = JSON.parse(err.message) as Record<
            string,
            string[]
          >;
          setServerErrors(parsedErrors);
          Object.values(parsedErrors).forEach((messages) => {
            messages.forEach((message) => {
              toast.error(message);
            });
          });
        } catch {
          toast.error(t("errors.unknown"));
        }
      } else {
        toast.error(t("errors.unknown"));
      }
    },
  });

  //mutate
  const onSubmit: SubmitHandler<RegisterLawyerType> = (data) => {
    mutate(data);
  };
  //next
  const handleNext = async (fields: (keyof RegisterLawyerType)[]) => {
    const isStepValid = await trigger(fields);
    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };
  //prev
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };
  // Handle file input change
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof RegisterLawyerType
  ) => {
    const file = e.target.files?.[0] || null;
    setValue(field, file);
    setImagePreviews((prev) => ({
      ...prev,
      [field]: file ? URL.createObjectURL(file) : null,
    }));
  };
  // Handle image removal
  const handleRemoveImage = (field: keyof RegisterLawyerType) => {
    setValue(field, null);
    setImagePreviews((prev) => ({
      ...prev,
      [field]: null,
    }));
  };
  return (
    <section>
      <div className="rtl:text-right w-full flex flex-col justify-center gap-8">
        <h2 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl">
          {t("title")}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-8"
          encType="multipart/form-data"
        >
          {/* Step 1: Email, Password, Password Confirmation */}
          {step === 1 && (
            <>
              <BasicInfoForm
                register={register}
                errors={errors}
                handleNext={() =>
                  handleNext(["email", "password", "password_confirmation"])
                }
              />
            </>
          )}
          {/* Step 2: Additional Fields */}
          {step === 2 && (
            <>
              <PersonalDetailsForm
                register={register}
                errors={errors}
                control={control}
                setValue={setValue}
                selectedCountry={selectedCountry}
                countriesData={countriesData?.data || []}
                citiesData={citiesData?.data || []}
                languagesData={languagesData?.data || []}
                legalFiledsData={legalFiledsData?.data || []}
                selected={selected}
                setSelected={setSelected}
                selectedLegal={selectedLegal}
                setSelectedLegal={setSelectedLegal}
                direction={direction}
                handleBack={handleBack}
                handleNext={() =>
                  handleNext([
                    "name",
                    "title",
                    "mobile",
                    "address",
                    "legal_fields",
                    "education",
                    "registration_number",
                    "medals",
                    "city_id",
                    "country_id",
                    "languages",
                  ])
                }
              />
            </>
          )}
          {/* Step 3: Image Uploads */}
          {step === 3 && (
            <>
              <ImageUploadForm
                errors={errors}
                imagePreviews={imagePreviews}
                handleFileChange={handleFileChange}
                handleRemoveImage={handleRemoveImage}
                handleBack={handleBack}
                handleNext={() =>
                  handleNext([
                    "img",
                    "photo_union_card",
                    "photo_passport",
                    "card_id_img",
                    "photo_office_rent",
                  ])
                }
              />
            </>
          )}
          {/* Step 4: account type */}
          {step === 4 && (
            <>
              <AccountTypeForm
                register={register}
                errors={errors}
                control={control}
                setValue={setValue}
                activeTab={activeTab}
                handleTabChange={handleTabChange}
                selectedCountryCompany={selectedCountryCompany || ""}
                countriesData={countriesData?.data || []}
                citiesData={citiesData?.data || []}
                ActiveCompaniesData={ActiveCompaniesData?.data || []}
                handleBack={handleBack}
                isPending={isPending}
              />
            </>
          )}
          {serverErrors && (
            <div className="text-red-500 text-sm mt-2">
              {Object.entries(serverErrors).map(([field, messages]) => (
                <div key={field}>
                  {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                  ))}
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
      <LawyerOtpDialog
        setIsDialogOpen={setIsDialogOpen}
        registeredEmail={registeredEmail}
        isDialogOpen={isDialogOpen}
      />
    </section>
  );
};

export default ConsultantForm;
