import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonLoading = () => {
  return (
    <div className="flex flex-col container mx-auto py-8">
      <div className="flex flex-row relative">
        <div className="w-full z-20 my-2">
          <div className="flex w-1/2 gap-3 items-center">
            {/* favorites */}
            <Skeleton className="h-8 w-1/3 mb-2" />
            <Skeleton className="h-8 w-1/3 mb-2" />
            <Skeleton className="h-8 w-1/3 mb-2" />
          </div>
          <div className="flex items-start justify-between">
            <div>
              {/* date */}
              <div className="flex flex-col mb-2">
                <Skeleton className="h-[32px] w-[397px] mb-2" />
              </div>
              {/* feels like */}
              <div className="flex flex-col mb-2">
                <Skeleton className="h-[28px] w-[397px] mb-2" />

                {/* temp */}
                <div className="flex items-start">
                  <Skeleton className="h-[128px] w-[418px] mr-4" />
                </div>
              </div>
              <div className="flex w-full gap-3 items-center">
                <Skeleton className="h-[28px] w-[127px] mb-2" />
                <Skeleton className="h-[28px] w-[100px] mb-2" />
              </div>
              <div className="mt-2 flex flex-col w-full gap-2">
                <Skeleton className="h-[66px] w-[344px]" />
                <Skeleton className="h-[66px] w-[344px]" />
                <Skeleton className="h-[66px] w-[344px]" />
              </div>
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
