import { ContactForm } from "@/lib/schemes/types/Contact";
import { useTranslations } from "next-intl";

interface OrderSummaryProps {
  data: ContactForm | null; // تحديد نوع data
}

const OrderSummary = ({ data }: OrderSummaryProps) => {
  const t = useTranslations("service");

  if (!data) return <p>{t("no_data")}</p>;

  return (
    <section>
      <div className="lg:m-6 md:m-4 m-0 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-semibold mb-4">{t("orderSummary")}</h2>
        <div className="flex flex-col gap-2">
          <p><strong>{t("name")}:</strong> {data.first_name} {data.last_name}</p>
          <p><strong>{t("email")}:</strong> {data.email}</p>
          <p><strong>{t("phonenumber")}:</strong> {data.mobile}</p>
          <p><strong>{t("orderSummary")}:</strong> {data.summary}</p>
          <p><strong>{t("yourMessage")}:</strong> {data.message}</p>
        </div>
      </div>
    </section>
  );
};

export default OrderSummary;