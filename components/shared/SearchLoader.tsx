import React from 'react'

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import Image from 'next/image'


const SearchLoader = () => {
    return (
        <div className="w-[450px] h-[450px] flex flex-col items-center justify-center bg-white rounded-lg">

            <div className="flex items-center ">
                <Image src="/assets/images/logo.png" alt="logo" width={150} height={150} />
                <h1 className="text-[45px] font-extrabold text-primary-500">utel</h1>
            </div>
            <Image
                src="/assets/icons/loading-circle.svg"
                alt="loader"
                height={120}
                width={120}
            />
        </div>
    )
}

export default SearchLoader