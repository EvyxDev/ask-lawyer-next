
import { Skeleton } from "@/components/ui/skeleton"; 

const ServiceSkeleton = () => {
  return (
     <div className="border-[1px] shadow-sm p-3 rounded-md">
       <div className="flex items-center gap-4">
         <Skeleton className="w-[60px] h-[60px] rounded-md" />
         <Skeleton className="h-6 w-3/4 rounded" />
       </div>
       <Skeleton className="h-4 w-full rounded mt-2" />
       <Skeleton className="h-4 w-5/6 rounded mt-2" />
       <div className="w-full flex justify-end mt-2">
         <Skeleton className="h-6 w-16 rounded-md" />
       </div>
       <Skeleton className="h-9 w-full rounded-md mt-2" />
     </div>
  )
}

export default ServiceSkeleton
