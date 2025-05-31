"use client"

import React from 'react';

import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import Image from 'next/image';

interface Image {
    image: {
        url: string;
        description: string;
    };
    imageId?: string;
    __typename?: string;
}

interface ImageSliderProps {
    images: Image[];
    imageIndex: number;
    active: number;
    showNextImage: () => void;
    showPrevImage: () => void;
    setImageIndex: (index: number) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, imageIndex, active, showNextImage, showPrevImage, setImageIndex }) => {
    return (
        <section aria-label="Image Slider" className="relative w-full h-full flex flex-col justify-around items-center overflow-hidden">
            <div className="relative w-full h-full flex-center ">
                {images.map((PropertyPhoto, index: number) => (
                    <div className="block absolute h-full sm:w-full md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] mx-[10px]">
                        <Image
                            key={PropertyPhoto?.imageId}
                            src={PropertyPhoto?.image?.url}
                            width={600}
                            height={400}
                            alt="property image"
                            aria-hidden={imageIndex !== index}
                            className={`object-cover w-full h-full block shrink-0 grow-0 rounded-lg transition-opacity duration-500 ${imageIndex === index ? 'opacity-100' : 'opacity-0'}`}

                        />
                        <div className="block absolute left-0 bottom-0 right-0 px-[10%] py-2 transition-colors duration-100 ease-in-out bg-black bg-opacity-10 flex-center">
                            <p className="text-white p-regular-20 text-center">
                                {images[imageIndex].image?.description}
                            </p>
                        </div>
                    </div>
                ))}

            </div>

            <div onClick={showPrevImage} className="block absolute top-0 bottom-0 left-0 p-1 cursor-pointer transition-colors duration-100 ease-in-out hover:bg-black hover:bg-opacity-20 flex-center">
                <ArrowBigLeft aria-hidden className="stroke-white fill-black w-10 h-10" />
            </div>

            <div onClick={showNextImage} className="block absolute top-0 bottom-0 right-0 p-1 cursor-pointer transition-colors duration-100 ease-in-out hover:bg-black hover:bg-opacity-20 flex-center">
                <ArrowBigRight aria-hidden className="stroke-white fill-black w-10 h-10" />
            </div>

            <div className="translate-[-50%] hidden md:flex-center gap-1 h-[150px] mt-8 overflow-hidden">
                <Carousel className="w-full h-full relative">
                    <CarouselContent className="w-full h-full">
                        {images.map((PropertyPhoto, index: number) => (
                            <CarouselItem
                                key={PropertyPhoto?.imageId}
                                className={`w-full h-[150px] sm:1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 cursor-pointer `}
                                onClick={() => setImageIndex(index)}
                            >
                                <Image
                                    src={PropertyPhoto?.image?.url}
                                    alt="property image"
                                    width={100}
                                    height={100}
                                    className={`object-cover object-center w-full h-full rounded-md ${index === active ? 'border-2 border-primary' : ''}`}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="bg-white/50 border-white/50 z-50 absolute top-[50%] left-0 p-2" />
                    <CarouselNext className="bg-white/50 border-white/50 z-50 absolute top-[50%] right-0 p-2" />
                </Carousel>
            </div>
        </section>
    );
};

export default ImageSlider;
