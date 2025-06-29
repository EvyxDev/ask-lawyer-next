import {
  Controller,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  Control,
} from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiLoader } from "react-icons/fi";
import { RegisterLawyerSchemaType } from "@/lib/schemes/types/authSchema";
import { useLocale, useTranslations } from "use-intl";

interface AccountTypeFormProps {
  register: UseFormRegister<RegisterLawyerSchemaType>;
  errors: FieldErrors<RegisterLawyerSchemaType>;
  control: Control<RegisterLawyerSchemaType>;
  setValue: UseFormSetValue<RegisterLawyerSchemaType>;
  activeTab: string;
  handleTabChange: (value: string) => void;
  selectedCountryCompany: string;
  countriesData?: City[];
  citiesData?: City[];
  ActiveCompaniesData?: City[];
  handleBack: () => void;
  isPending: boolean;
}

const AccountTypeForm = ({
  register,
  errors,
  control,
  setValue,
  activeTab,
  handleTabChange,
  selectedCountryCompany,
  countriesData,
  citiesData,
  ActiveCompaniesData,
  handleBack,
  isPending,
}: AccountTypeFormProps) => {
  const t = useTranslations("register");
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";
  return (
    <>
      <h2 className="text-primary xl:text-2xl lg:text-xl text-lg ">{t("are-you")}</h2>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="flex justify-center items-center mb-6 w-full">
          <TabsList className="flex w-full lg:gap-6 md:gap-4 gap-2 bg-transparent justify-center items-center h-12">
            <TabsTrigger
              value="free-lawyer"
              onClick={() => setValue("account_type", "individual")}
              className="w-auto h-9 cursor-pointer font-semibold shadow-transparent text-secondary-dark xl:text-2xl lg:text-xl md:text-lg text-sm data-[state=active]:bg-primary data-[state=active]:py-5 data-[state=active]:px-2 data-[state=active]:text-white rounded-md data-[state=active]:font-bold transition-colors"
            >
              {t("free-lawyer")}
            </TabsTrigger>
            <TabsTrigger
              value="lawFirm_owner"
              onClick={() => setValue("account_type", "individual")}
              className="w-auto h-9 cursor-pointer font-semibold shadow-transparent text-secondary-dark xl:text-2xl lg:text-xl md:text-lg text-sm data-[state=active]:bg-primary data-[state=active]:py-5 data-[state=active]:px-2 data-[state=active]:text-white rounded-md data-[state=active]:font-bold transition-colors"
            >
              {t("lawFirm_owner")}
            </TabsTrigger>
            <TabsTrigger
              value="lawFirm_affiliated"
              onClick={() => setValue("account_type", "company")}
              className="w-auto h-9 cursor-pointer font-semibold shadow-transparent text-secondary-dark xl:text-2xl lg:text-xl md:text-lg text-sm data-[state=active]:bg-primary data-[state=active]:py-5 data-[state=active]:px-2 data-[state=active]:text-white rounded-md data-[state=active]:font-bold transition-colors"
            >
              {t("lawFirm_affiliated")}
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="free-lawyer">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="xl:text-2xl lg:text-xl md:text-lg text-md cursor-pointer lg:py-3 py-2 bg-background-dark hover:bg-secondary-dark w-full rounded-lg text-white"
            >
              {t("back")}
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="xl:text-2xl lg:text-xl md:text-lg text-md cursor-pointer lg:py-3 py-2 bg-background-dark hover:bg-secondary-dark w-full rounded-lg text-white"
            >
              {isPending ? (
                <span className="w-full flex justify-center items-center">
                  <FiLoader className="animate-spin duration-500 text-2xl text-primary" />
                </span>
              ) : (
                t("submit")
              )}
            </button>
          </div>
        </TabsContent>
        <TabsContent value="lawFirm_owner">
          <h2 className="xl:text-2xl lg:text-xl md:text-lg text-md mb-2  text-primary">{t("lawFirm_info")}</h2>
          <div>
            <input
              type="text"
              className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              placeholder={t("labels.name_company")}
              {...register("name_company")}
            />
            {errors.name_company && (
              <p className="text-red-500 text-sm mt-2">
                {errors.name_company.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <input
              type="text"
              className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              placeholder={t("labels.bio")}
              {...register("bio_company")}
            />
            {errors.bio_company && (
              <p className="text-red-500 text-sm mt-2">
                {errors.bio_company.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <input
              type="url"
              className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              placeholder={t("labels.website_company")}
              {...register("website_company")}
            />
            {errors.website_company && (
              <p className="text-red-500 text-sm mt-2">
                {errors.website_company.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <input
              type="text"
              className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              placeholder={t("labels.linked_in_company")}
              {...register("linked_in_company")}
            />
            {errors.linked_in_company && (
              <p className="text-red-500 text-sm mt-2">
                {errors.linked_in_company.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <input
              type="text"
              className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              placeholder={t("labels.address_company")}
              {...register("address_company")}
            />
            {errors.address_company && (
              <p className="text-red-500 text-sm mt-2">
                {errors.address_company.message}
              </p>
            )}
          </div>
          <div className="flex lg:flex-row flex-col gap-6 w-full mt-4">
            <div className="lg:w-1/2 w-full">
              <Controller
                name="city_id_company"
                control={control}
                rules={{ required: t("city_required") }}
                render={({ field }) => (
                  <Select
                    dir={direction}
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedCountryCompany}
                  >
                    <SelectTrigger className="w-full bg-[#F5F5F5] rounded-md !py-6">
                      <SelectValue placeholder={t("city")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{t("cities")}</SelectLabel>
                        {citiesData?.map(
                          (city: { id: number; name: string }) => (
                            <SelectItem
                              key={city.id}
                              value={city.id.toString()}
                            >
                              {city.name}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.city_id_company && (
                <p className="text-red-500 text-sm px-4">
                  {errors.city_id_company.message}
                </p>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <Controller
                name="country_id_company"
                control={control}
                rules={{ required: t("country_required") }}
                render={({ field }) => (
                  <Select
                    dir={direction}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setValue("city_id_company", "");
                    }}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full bg-[#F5F5F5] rounded-md !py-6">
                      <SelectValue placeholder={t("country")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{t("countries")}</SelectLabel>
                        {countriesData?.map(
                          (country: { id: number; name: string }) => (
                            <SelectItem
                              key={country.id}
                              value={country.id.toString()}
                            >
                              {country.name}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.country_id_company && (
                <p className="text-red-500 text-sm px-4">
                  {errors.country_id_company.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4 my-4">
            <button
              type="button"
              onClick={handleBack}
              className="xl:text-2xl lg:text-xl md:text-lg text-md cursor-pointer lg:py-3 py-2 bg-background-dark hover:bg-secondary-dark w-full rounded-lg text-white"
            >
              {t("back")}
            </button>
            <button
              type="submit"
              disabled={isPending}
              onClick={() => setValue("account_type", "individual")}
              className="xl:text-2xl lg:text-xl md:text-lg text-md cursor-pointer lg:py-3 py-2 bg-background-dark hover:bg-secondary-dark w-full rounded-lg text-white"
            >
              {isPending ? (
                <span className="w-full flex justify-center items-center">
                  <FiLoader className="animate-spin duration-500 text-2xl text-primary" />
                </span>
              ) : (
                t("submit")
              )}
            </button>
          </div>
        </TabsContent>
        <TabsContent value="lawFirm_affiliated">
          <div className="w-full">
            <label htmlFor="parent_id">{t("avilable_Active_Companies")}</label>
            <Controller
              name="parent_id"
              control={control}
              rules={{ required: t("city_required") }}
              render={({ field }) => (
                <Select
                  dir={direction}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="w-full bg-[#F5F5F5] rounded-md !py-6">
                    <SelectValue placeholder={t("choose_company")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t("Companies")}</SelectLabel>
                      {ActiveCompaniesData?.map((company: City) => (
                        <SelectItem
                          key={company.id}
                          value={company.id.toString()}
                        >
                          {company.name_company}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.parent_id && (
              <p className="text-red-500 text-sm px-4">
                {errors.parent_id.message}
              </p>
            )}
            <div className="flex gap-4 my-4">
              <button
                type="button"
                onClick={handleBack}
                className="xl:text-2xl lg:text-xl md:text-lg text-md cursor-pointer lg:py-3 py-2 bg-background-dark hover:bg-secondary-dark w-full rounded-lg text-white"
              >
                {t("back")}
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="xl:text-2xl lg:text-xl md:text-lg text-md cursor-pointer lg:py-3 py-2 bg-background-dark hover:bg-secondary-dark w-full rounded-lg text-white"
              >
                {isPending ? (
                  <span className="w-full flex justify-center items-center">
                    <FiLoader className="animate-spin duration-500 text-2xl text-primary" />
                  </span>
                ) : (
                  t("submit")
                )}
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default AccountTypeForm;
