import { Suspense } from "react";
import PlatformServiceComponent from "../_components/PlatformServiceComponent";
import { Skeleton } from "@/components/ui/skeleton";


interface PageParams {
  locale: string;
  id: string;
}

interface PageProps {
params: Promise<PageParams>;
}
const ServiceSkeleton = () => {
  return (
    <div className=" space-y-4">
      <Skeleton className="h-6 bg-gray-300 rounded w-1/3" />
      <Skeleton className="h-4 bg-gray-300 rounded w-2/3" />
      <Skeleton className="h-4 bg-gray-300 rounded w-1/2" />
      <Skeleton className="h-60 bg-gray-300 rounded" />
    </div>
  );
};


const Page = async ({ params }: PageProps) => {
  const { id, locale } = await params;

  return (
    <section className="p-4">
      <Suspense fallback={<ServiceSkeleton />}>
        <PlatformServiceComponent locale={locale} id={id} />
      </Suspense>
    </section>
  );
};

export default Page;
