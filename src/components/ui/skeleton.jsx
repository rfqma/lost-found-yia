import { cn } from "@/lib/utilities"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      className={cn("animate-pulse rounded-md bg-slate-100 dark:bg-slate-800", className)}
      {...props} />)
  );
}

export { Skeleton }
