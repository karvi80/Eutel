"use client"

import React, { useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'


interface ImageCarouselProps {
    carouselImages?: [];
    carouselImage: {};
    carouselImageUrl: string;
    carouselImageId: string;
    imageIndex: number
}

const ImageCarousel = ({ carouselImages, carouselImage, carouselImageUrl, carouselImageId, imageIndex }: ImageCarouselProps) => {
    const [imageIndex, setImageIndex] = useState(0);


    return (
        <div className="translate-[-50%] hidden sm:flex-center gap-1 h-[150px] mt-8 ">
            <Carousel className="w-full h-full relative">
                <CarouselContent>
                    {carouselImages?.map((carouselImage, index: number) => (
                        <CarouselItem
                            key={carouselImageId}
                            className={`w-full h-[150px] sm:basis-1/3 md:basis-1/5 lg:basis-1/6 xl:basis-1/8 cursor-pointer ${index === active ? 'border-2 border-primary' : ''}`}
                            onClick={() => setImageIndex(index)}
                        >
                            <Image
                                src={carouselImageUrl}
                                alt="property image"
                                width={100}
                                height={100}
                                className="object-cover object-center w-full h-full rounded-md"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="bg-white/50 border-white/50 z-50 absolute top-[50%] left-0 p-2" />
                <CarouselNext className="bg-white/50 border-white/50 z-50 absolute top-[50%] right-0 p-2" />
            </Carousel>
        </div>
    )
}

export default ImageCarousel