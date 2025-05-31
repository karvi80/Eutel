"use client"

import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import { ImageProps, PropertyGalleryProps } from '@/types';


interface PropertyThumbnailProps {
    propertyGallery: PropertyGalleryProps;
    slicedImages: ImageProps[];
    imageCount: number;
}

const PropertyThumbnail: React.FC<PropertyThumbnailProps> = ({ propertyGallery, slicedImages, imageCount }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full cursor-pointer">
            <div className="flex items-center justify-center gap-2 w-full h-[300px] xl:h-[450px]">
                <div className="flex flex-col w-1/3 h-full gap-2">
                    <div className="h-1/2 w-full rounded-lg bg-cover" style={{ backgroundImage: `url(${propertyGallery?.images[0].image.url})` }}>
                        <p className="p-regular-14 text-center text-white px-[10%] py-2">{propertyGallery?.images[0].image.description}</p>
                    </div>
                    <div className="h-1/2 w-full rounded-lg bg-cover" style={{ backgroundImage: `url(${propertyGallery?.images[1].image.url})` }}>
                        <p className="p-regular-14 text-center text-white px-[10%] py-2">{propertyGallery?.images[1].image.description}</p>
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-center h-full">
                    <div className="w-full h-full rounded-lg bg-cover" style={{ backgroundImage: `url(${propertyGallery?.images[2].image.url})` }}>
                        <p className="p-regular-14 text-center text-white px-[10%] py-2">{propertyGallery?.images[2].image.description}</p>
                    </div>
                </div>
            </div>

            <div className="h-[120px] w-full hidden md:flex-between mt-2">
                <Carousel className="w-full h-full relative">
                    <CarouselContent>
                        {slicedImages?.map((slicedImage: ImageProps, index: number) => (
                            <CarouselItem
                                key={slicedImage?.imageId}
                                className="w-full h-full sm:basis-1/3 md:basis-1/5 lg:basis-1/6 xl:basis-1/8 cursor-pointer"
                            >
                                <Card>
                                    <CardContent className="flex-center aspect-square p-2 relative">
                                        <img key={slicedImage?.imageId} src={slicedImage?.image.url} alt={slicedImage.__typename}
                                            className="object-cover h-full block shrink-0 grow-0 rounded-lg"
                                        />
                                        <div className={`${index === slicedImages.length - 1 ? 'absolute inset-0 flex-center bg-black bg-opacity-20' : 'hidden'}`}>
                                            <p className="p-medium-16 text-white">{`+ ${imageCount} Photos`}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
};

export default PropertyThumbnail;
