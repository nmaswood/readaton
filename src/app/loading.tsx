import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-8 w-full flex mt-4 rounded-md p-8">
      <div className="rounded-md cursor-pointer space-y-2">
        <div className="w-full md:h-[21rem] h-[14rem]">
          <Skeleton className="w-full h-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <div className="rounded-md cursor-pointer space-y-2">
        <div className="w-full md:h-[21rem] h-[14rem]">
          <Skeleton className="w-full h-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}
