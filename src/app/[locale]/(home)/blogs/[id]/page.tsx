import { Suspense } from "react";
import { Link } from "@/i18n/routing";
import { getBlog } from "@/lib/apis/home";
import { getTranslations } from "next-intl/server";
import { IoArrowRedoOutline } from "react-icons/io5";
import { Skeleton } from "@/components/ui/skeleton";
import { ClientImage } from "@/components/ClientImage";
import { FaEye } from "react-icons/fa6";
import ActiveLawyers from "@/components/ActiveLawyers";

type PageProps = {
  params: Promise<{ id: string }>;
};
async function BlogContent({ id }: { id: string }) {
  const response: BlogDetailsResponse = await getBlog(id);
  const t = await getTranslations();

  if (!response.success || !response.data) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold">{t("blog_not_found")}</h1>
        <p>{t("blog_not_found_description")}</p>
      </div>
    );
  }

  const { title, description, image, added_by, created_at, views } =
    response.data;

  return (
    <div className="container mx-auto max-w-7xl py-8 p-4">
      <Link
        href="/blogs"
        className="inline-flex items-center justify-center gap-2 text-primary hover:text-primary-dark my-6 mx-4 transition-colors duration-300 text-2xl"
      >
        <IoArrowRedoOutline className="rtl:-translate-x-1 ltr:scale-x-[-1] ltr:translate-x-1" />
        {t("back_to_blogs")}
      </Link>
      <ClientImage
        width={500}
        height={500}
        src={image}
        alt={title}
        className="w-full h-80 object-cover rounded-lg mb-4"
        priority
      />

      <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-6 gap-4">
        <div className=" w-full mb-4 lg:col-span-8 col-span-1 rounded-md border-[1px] border-[#D8D8D8] ">
          <div className=" w-full mb-4 bg-gray-50">
            <div className="flex md:flex-row flex-col  justify-between p-4">
              <h1 className="text-3xl font-bold mb-2 break-after-all">{title}</h1>
            <div className="flex flex-col gap-2 md:me-8 me-2">
              <span className="flex gap-2 items-center text-lg">
                <FaEye className="text-primary" />
                <p>{views}</p>
              </span>
              <p className="font-normal text-lg">{created_at}</p>
            </div>
            </div>
          </div>
          <div className="flex gap-2 items-center my-4 p-4">
            <ClientImage
              width={70}
              height={70}
              src={added_by?.image}
              alt={added_by?.name}
              className="w-14 h-14 rounded-full me-2"
            />
            <p className="text-sm text-gray-500">
              {t("by")} {added_by?.name}
            </p>
          </div>
          <p className="text-gray-600 mb-4 p-4">{description}</p>
        </div>
        <ActiveLawyers/>
      </div>
    </div>
  );
}
function BlogSkeleton() {
  return (
    <div className="container mx-auto py-8 p-4">
      <Skeleton className="h-10 w-40 my-6 mx-4" />
      <Skeleton className="w-full h-80 rounded-lg mb-4" />
      <Skeleton className="h-9 w-3/4 mb-2" />
      <Skeleton className="h-16 w-full mb-4" />
      <div className="flex items-center mb-4">
        <Skeleton className="w-10 h-10 rounded-full me-2" />
        <div className="flex flex-col gap-1 w-full">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/5" />
        </div>
      </div>
    </div>
  );
}
const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <section className="relative w-full h-auto overflow-hidden">
      <Suspense fallback={<BlogSkeleton />}>
        <BlogContent id={id} />
      </Suspense>
    </section>
  );
};
export default Page;
