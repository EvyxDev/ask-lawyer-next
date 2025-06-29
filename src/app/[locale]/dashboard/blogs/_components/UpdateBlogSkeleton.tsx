import { Skeleton } from "@/components/ui/skeleton";

const UpdateBlogSkeleton = () => {
  return (
    <div className="lg:m-6 md:m-4 m-0 bg-[#FFFFFF] rounded-lg shadow-md p-4">
      <div className="w-full max-w-4xl mx-auto container flex flex-col gap-4">
        <div className="flex gap-2 flex-col w-full">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
        <div className="flex gap-2 flex-col w-full">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
        <div className="flex lg:flex-row flex-col gap-6 w-full">
          <div className="lg:w-1/2 w-full">
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
          <div className="lg:w-1/2 w-full">
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>
        <div className="flex gap-2 flex-col w-full">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-48 w-full rounded-md" />
        </div>
        <div className="w-full flex justify-end">
          <Skeleton className="h-12 w-32 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default UpdateBlogSkeleton;
