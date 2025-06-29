import { Skeleton } from "@/components/ui/skeleton";

const ChatSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 p-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="flex items-start gap-2 animate-pulse">
          <Skeleton className="w-8 h-8 rounded-full bg-muted" />
          <Skeleton className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24 bg-muted rounded" />
            <Skeleton className="h-12 w-3/4 bg-muted rounded" />
          </Skeleton>
        </Skeleton>
      ))}
    </div>
  );
};

export default ChatSkeleton
