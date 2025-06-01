import { Skeleton } from "@/components/ui/skeleton";

const ProfileFormSkeleton = () => {
  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="bg-[#FFFFFF] rounded-lg shadow-md flex justify-center max-w-5xl mx-auto container h-full">
        <div className="lg:p-8 md:p-6 p-4 w-full flex justify-between items-center lg:gap-8 md:gap-6 gap-4">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Skeleton className="size-24 rounded-full border-2 border-primary" />
              <Skeleton className="absolute left-0 bottom-0 bg-secondary p-2 rounded-full w-10 h-10" />
            </div>
            <span className="flex gap-2 flex-col">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </span>
          </div>
          <Skeleton className="h-10 w-28 rounded-sm" />
        </div>
      </div>

      <div className="bg-[#FFFFFF] rounded-lg shadow-md flex justify-center max-w-5xl mx-auto container h-full">
        <div className="p-8 w-full flex flex-col lg:gap-8 md:gap-6 gap-4">
          <div className="w-full flex justify-end">
            <Skeleton className="h-10 w-28 rounded-sm" />
          </div>
          <div className="flex lg:flex-row flex-col gap-6 w-full">
            <div className="lg:w-1/2 w-full">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="lg:w-1/2 w-full">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="w-full">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex lg:flex-row flex-col gap-6 w-full">
            <div className="lg:w-1/2 w-full">
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="lg:w-1/2 w-full">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col gap-6 w-full">
            <div className="lg:w-1/2 w-full">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="lg:w-1/2 w-full">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileFormSkeleton;
