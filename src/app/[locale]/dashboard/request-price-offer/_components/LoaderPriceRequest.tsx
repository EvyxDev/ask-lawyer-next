import { Skeleton } from "@/components/ui/skeleton"; 
import { Card, CardContent, CardHeader } from "@/components/ui/card";
const LoaderPriceRequest = () => {
  return (
    <section className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" /> {/* Title */}
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-64 w-full rounded-lg" /> {/* Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Request status */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-1/2" /> {/* Status title */}
              <Skeleton className="h-5 w-1/3" /> {/* Status text */}
            </div>
            {/* Request Date */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-1/2" /> {/* Date title */}
              <Skeleton className="h-5 w-1/4" /> {/* Date text */}
            </div>
          </div>
          {/* Request Details */}
          <div>
            <Skeleton className="h-6 w-1/3 mb-2" /> {/* Details title */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" /> {/* Message */}
              <Skeleton className="h-4 w-3/4" /> {/* Summary */}
            </div>
          </div>
          {/* Attached Files */}
          <div>
            <Skeleton className="h-6 w-1/4 mb-2" /> {/* Files title */}
            <div className="flex gap-4">
              <Skeleton className="h-10 w-24" /> {/* File button 1 */}
              <Skeleton className="h-10 w-24" /> {/* File button 2 */}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default LoaderPriceRequest
