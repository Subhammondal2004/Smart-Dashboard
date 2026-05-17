export const Skeleton = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`bg-muted rounded-lg animate-pulse-subtle ${className}`}
    />
  );
};

export const SkeletonText = () => {
  return <Skeleton className="h-4 w-full" />;
};

export const SkeletonCard = () => {
  return (
    <div className="dashboard-card space-y-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
};

export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
