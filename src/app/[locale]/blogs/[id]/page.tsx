import { Link } from "@/i18n/routing";
import { getBlog } from "@/lib/apis/home";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { IoArrowRedoOutline } from "react-icons/io5";

export async function generateMetadata({ params }: BlogDetailsProps) {
  const { id } = params;
  const response: BlogDetailsResponse = await getBlog(Number(id));
  if (!response.success || !response.data) {
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found.",
    };
  }
  const { title, description, image } = response.data;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
  };
}
const Page = async ({ params }: BlogDetailsProps) => {
  const { id } = params;
  const response: BlogDetailsResponse = await getBlog(Number(id));
  const t = await getTranslations();

  if (!response.success || !response.data) {
    return (
      <section className="relative w-full h-auto overflow-hidden">
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold">{t("blog_not_found")}</h1>
          <p>{t("blog_not_found_description")}</p>
        </div>
      </section>
    );
  }

  const { title, description, image, added_by, created_at, views } =
    response.data;

  return (
    <section className="relative w-full h-auto overflow-hidden">
      <div className="container mx-auto py-8">
        <Link
          href="/blog"
          className="inline-flex items-center justify-center gap-2 text-primary hover:text-primary-dark my-6 mx-4 transition-colors duration-300 text-2xl"
        >
          <IoArrowRedoOutline className=" rtl:-translate-x-1 ltr:scale-x-[-1] ltr:translate-x-1" />
          {t("back_to_blogs")}
        </Link>
        <Image
          width={500}
          height={500}
          src={image}
          alt={title}
          className="w-full h-80 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center mb-4">
          <Image
            width={50}
            height={50}
            src={added_by.image}
            alt={added_by.name}
            className="w-10 h-10 rounded-full me-2"
          />
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500 ">
              {t("by")} {added_by.name}
            </p>
            <p className="text-sm text-gray-500 ">{created_at}</p>
            <p className="text-sm text-gray-500 ">
              {t("views", { count: views })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Page;
