"use client"

import React from 'react'
import Image from 'next/image'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from '../ui/carousel'
import { Card, CardContent, CardFooter, CardDescription } from '../ui/card'
import Autoplay from "embla-carousel-autoplay"

import { cities } from '@/constants'
import { cn } from '@/lib/utils'

const TrendingDestinations = () => {

    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )



    return (
        <div className="relative w-full flex flex-col mt-20">
            <Image src="/assets/images/world-map.png" alt="world-map" width={200} height={200}
            className="absolute w-full h-full -top-10 left-1/2 trnasform -translate-x-1/2 object-cover -z-10  opacity-50 hidden lg:block"
             />
            <div className="w-full text-center">
                <h1 className="h2-bold text-center">Trending Destinations</h1>
                 <p className="p-medium-16">Most popular choices for travelers from around the world</p>
            </div>

            <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
                align: "start",
            }}
            className="w-full h-full mt-5"
            >
            <CarouselContent className="gap-10 px-10">
                {cities.map((city, index) => (
                    <CarouselItem key={index}
                        className="md:basis1/2 lg:basis-1/3 xl:basis-1/4 w-[200px] h-[300px] rounded-lg"
                    >
                        <Card className=" w-full h-full flex-between flex-col rounded-lg overflow-hidden p-0 m-0">
                            <Image
                                src={city.img}
                                alt={city.location}
                                width={200}
                                height={200}
                                className="w-full h-[200px] object-cover"
                            />
                            <div className="w-full h-[100px] p-2">
                                <CardFooter className="h5-bold flex p-0 m-0">
                                    <Image src="/assets/icons/location.svg" alt="location" width={24} height={24}
                                        className="mr-2"
                                    />
                                    {city.location}
                                </CardFooter>

                                <CardDescription>
                                        {city.desc}
                                </CardDescription>
                            </div>

                        </Card>


                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        </div>
    )
}

export default TrendingDestinations