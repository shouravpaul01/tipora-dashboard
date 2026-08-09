export const  NotificationSkeleton=()=>{
  return (
    <div className="divide-y">
      {Array.from({ length: 5 }).map(
        (_, index) => (
          <div
            key={index}
            className="animate-pulse px-5 py-4"
          >
            <div className="flex gap-3">
              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-muted" />

              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-1/2 rounded bg-muted" />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}