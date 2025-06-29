import { useTranslations } from "next-intl";

const DueAmount = ({price}:{price?:string}) => {
  const t = useTranslations("service");
  return (
    <div>
      <div className="h-12 w-full  bg-gray-100 flex justify-center items-center  md:text-2xl text-xl">
        <p>{t("pay_service_order")}</p>
      </div>
      <div className="p-4 flex flex-col gap-4  rounded-md">
        <div className="flex justify-around">
          <h3 className="md:text-3xl text-2xl text-primary font-medium mb-4">
            {t("DueAmount")}
          </h3>
          <p className="bg-primary p-2 text-secondary md:text-2xl text-xl rounded-sm font-semibold">
           {price ? `${price} USD` : "49 USD"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DueAmount;
