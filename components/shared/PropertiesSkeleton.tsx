import React from 'react'
import { Skeleton } from '../ui/skeleton'

const PropertiesSkeleton = () => {
  return (
    <div className="w-full h-full p-4 flex flex-col space-y-3">
    <div className="flex-between p-4 w-full h-[250px]">
        <div className="h-full flex-1">
            <Skeleton className="w-[160px] h-full rounded-lg" />

            <div className="h-full">
              <Skeleton className="w-full h-[80px]" />
              <Skeleton className="w-[150px] h-[80]"/>
              <Skeleton className="w-[150px] h-[80]"/>
            </div>
        </div>

        <div className="sm:w-[100px] sm:h-full hidden">
            <Skeleton className="w-[75px] h-[80px]" />
            <Skeleton className="w-[75px] h-[80px]" />
            <Skeleton className="w-full h-[80px]" />
           
        </div>
    </div>

    <div className="flex-between p-4 w-full h-[250px]">
        <div className="h-full flex-1">
            <Skeleton className="w-[160px] h-full rounded-lg" />

            <div className="h-full">
              <Skeleton className="w-full h-[80px]" />
              <Skeleton className="w-[150px] h-[80]"/>
              <Skeleton className="w-[150px] h-[80]"/>
            </div>
        </div>

        <div className="sm:w-[100px] sm:h-full hidden">
            <Skeleton className="w-[75px] h-[80px]" />
            <Skeleton className="w-[75px] h-[80px]" />
            <Skeleton className="w-full h-[80px]" />
           
        </div>
    </div>

    <div className="flex-between p-4 w-full h-[250px]">
        <div className="h-full flex-1">
            <Skeleton className="w-[160px] h-full rounded-lg" />

            <div className="h-full">
              <Skeleton className="w-full h-[80px]" />
              <Skeleton className="w-[150px] h-[80]"/>
              <Skeleton className="w-[150px] h-[80]"/>
            </div>
        </div>

        <div className="sm:w-[100px] sm:h-full hidden">
            <Skeleton className="w-[75px] h-[80px]" />
            <Skeleton className="w-[75px] h-[80px]" />
            <Skeleton className="w-full h-[80px]" />
           
        </div>
    </div>
    </div>
  )
}

export default PropertiesSkeleton