"use client"

import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { PropertyCardProps } from '@/types'
import { useRouter } from 'next/navigation'





const ProperrtyCard = ({ imageUrl, name, distance, unit, neighborhood, score, reviewCount, stay, adults, children, price, priceRate, availableRooms }: PropertyCardProps) => {

    const router = useRouter();



    return (
        <div className="w-full h-[320px] md:h-[250px] flex-between
        rounded-md border border-gray-200 mt-6 p-4 cursor-pointer"

        >
            <div className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] overflow-hidden rounded-lg">
                <Image src={imageUrl} alt="hotel image" width={200} height={200} priority
                    className="object-cover object-center w-full h-full sm:w-200 sm:h-200 md:w-150 md:h-150 lg:w-100 lg:h-100"

                />
            </div>



            <div className="flex flex-col justify-around flex-1 w-full h-full px-4">
                <div className="w-full flex items-start justify-between">
                    <div className="flex flex-col text-left">
                        {name && (
                            <h1 className=" text-primary h3-medium">{name}</h1>
                        )}

                        {neighborhood && (
                            <h4 className="p-medium-16">{neighborhood}</h4>
                        )}

                        {distance && (
                            <div className="flex gap-1 text-left">
                                <h6 className="p-medium-12">{distance}</h6>
                                <h6 className="p-medium-12">{unit}</h6>
                            </div>
                        )}
                    </div>

                    {score && (
                        <div className="flex flex-col text-right">
                            <h2 className="h2-medium text-primary">{score}<span className="p-medium-12">/10</span></h2>
                            <h6 className="p-medium-14 hidden md:block">{reviewCount} reviews</h6>
                        </div>
                    )}
                </div>


                <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col">

                        <p className="p-medium-12">{stay} nights, {adults} adults, {children} child</p>
                        {
                            availableRooms ? (
                                <p className="text-coral text-left p-medium-12">rooms available: {availableRooms}</p>
                            ) : (
                                <p className="text-coral-500 text-left p-medium-12">only few rooms available</p>
                            )
                        }
                    </div>



                    <div className="flex flex-col">

                        <h1 className="h3-medium text-primary">{price} </h1>
                        <p className="p-medium-12">{priceRate}</p>
                    </div>
                </div>

                <div className="w-full hidden lg:flex items-center justify-end">
                    <Button>See Availability</Button>
                </div>
            </div>

        </div>
    )
}

export default ProperrtyCard