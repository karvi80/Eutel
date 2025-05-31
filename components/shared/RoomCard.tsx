import React from 'react';
import Image from 'next/image';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';

import { RoomCardProps } from '@/types';

import { Bath, Tv, BedDouble, Wifi, Coffee, Baby, ListCollapse, Check, Accessibility, CarFront } from 'lucide-react';
import Link from 'next/link';

const RoomCard: React.FC<RoomCardProps> = ({ room, roomIndex, showDetails, setShowDetails, searchParams, summary }) => {
    const unitImage = room?.primarySelections?.[0]?.propertyUnit?.unitGallery?.gallery?.[0]?.image?.url;
    const encodedUnitImage = encodeURIComponent(unitImage || '');


    const parseHtmlToJsx = (html: any) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const listItems = tempDiv.querySelectorAll('li');
        return (
            <ul>
                {Array.from(listItems).map((item, index) => (
                    <li key={index}>{item.textContent}</li>
                ))}
            </ul>
        );
    };

    const getIconForAmenity = (amenity: string) => {
        const trimmedAmenity = amenity.trim().toLowerCase();
        switch (trimmedAmenity) {
            case 'bathroom':
                return <Bath />;
            case 'entertainment':
                return <Tv />;
            case 'bedroom':
                return <BedDouble />;
            case 'internet':
                return <Wifi />;
            case 'food and drink':
                return <Coffee />;
            case 'family friendly':
                return <Baby />;
            case 'accessibility':
                return <Accessibility />;
            case 'more':
                return <ListCollapse />;
            case 'parking':
                return <CarFront />;
            default:
                return <Check />;
        }
    };

    return (
        <div className="relative flex flex-col lg:w-[300px] w-[350px] h-[550px] border-2 border-primary rounded-[14px] overflow-hidden">
            <div className="w-full h-[250px] flex-center">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full h-full relativ">
                    <CarouselContent className="w-full h-full m-0 p-0">
                        {room?.primarySelections?.[0]?.propertyUnit?.unitGallery?.gallery?.map((unitImage, index: number) => (

                            <CarouselItem key={index} className='w-full h-[250px] cursor-pointer p-0 m-0'>
                                <div className="relative w-full h-full p-0">
                                    <Image
                                        src={unitImage?.image?.url ? unitImage?.image?.url : '/assets/images/image_not_available.png'}
                                        alt="Room image"
                                        layout='fill'
                                        objectFit="cover"
                                        className="object-center w-full h-full"
                                    />
                                </div>
                            </CarouselItem>

                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="bg-white/50 border-white/50 z-50 absolute top-[50%] left-0 p-2" />
                    <CarouselNext className="bg-white/50 border-white/50 z-50 absolute top-[50%] right-0 p-2" />
                </Carousel>
            </div>

            <div className="flex flex-col px-2 mt-4">
                <div className="flex-center">
                    <h2>{room?.header?.text}</h2>
                    <p>{room?.featureHeader?.text}</p>
                </div>
                <div className="flex-center flex-wrap gap-3">
                    {room?.features && (
                        room.features.map((feature) => (
                            <div key={feature?.text}>
                                <Button variant='outline' className="p-2">{feature?.text}</Button>
                            </div>
                        ))
                    )}
                </div>
            </div>



            <div className="flex flex-col items-center justify-center mt-4 px-2">
                {room?.primarySelections?.map((primarySelection) => (
                    <div key={primarySelection.__typename}>
                        <h4 className="p-semibold-18">{primarySelection?.propertyUnit?.roomAmenities?.header?.text}...</h4>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline"
                                    className="mb-4"
                                    onClick={() => setShowDetails(showDetails === roomIndex ? null : roomIndex)}>
                                    {showDetails === roomIndex ? 'Hide Room Details ' : 'Show Room Details'}
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[50vw] h-[80vh] mx-auto my-auto overflow-y-auto z-50">
                                {showDetails === roomIndex && (
                                    <div>
                                        <div className="w-full h-[250px] flex-center">
                                            <Carousel
                                                opts={{
                                                    align: "start",
                                                }}
                                                className="w-full h-full relative">
                                                <CarouselContent className="w-full h-full m-0 p-0 rounded-lg">
                                                    {room?.primarySelections?.[0]?.propertyUnit?.unitGallery?.gallery?.map((unitImage, index: number) => (
                                                        <CarouselItem key={index} className='w-full h-[250px] cursor-pointer p-0 m-0'>
                                                            <div className="relative w-full h-full p-0">
                                                                <Image
                                                                    src={unitImage?.image?.url}
                                                                    alt="Room image"
                                                                    layout='fill'
                                                                    objectFit="cover"
                                                                    className="object-center w-full h-full rounded-lg"
                                                                />
                                                            </div>
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                                <CarouselPrevious className="bg-white/50 border-white/50 z-50 absolute top-[50%] left-0 p-2" />
                                                <CarouselNext className="bg-white/50 border-white/50 z-50 absolute top-[50%] right-0 p-2" />
                                            </Carousel>
                                        </div>

                                        <div className="flex flex-col px-2 mt-4">
                                            <div className="flex-center">
                                                <h2>{room?.header?.text}</h2>
                                                <p>{room?.featureHeader?.text}</p>
                                            </div>
                                            <div className="flex-center flex-wrap gap-3">
                                                {room?.features && (
                                                    room.features.map((feature) => (
                                                        <div key={feature?.text}>
                                                            <Button variant='outline' className="p-2">{feature?.text}</Button>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>

                                        {primarySelection?.propertyUnit?.roomAmenities?.bodySubSections?.map((bodySubSection) => (
                                            <div className="flex items-start justify-start flex-wrap p-4 gap-4" key={bodySubSection.__typename}>
                                                {bodySubSection?.contents?.map((content) => (
                                                    <div key={content.__typename} className="w-[33%]">
                                                        <div className="flex items-end justify-start">
                                                            <p className="p-medium-16">{getIconForAmenity(content?.header?.text ?? '')}</p>
                                                            <h5 className="sm:block hidden p-medium-16 mt-4 ml-2"> {content?.header?.text}:</h5>
                                                        </div>
                                                        {content?.items?.map((item) => (
                                                            <div key={item.__typename}>
                                                                <h6 className="p-medium-12">{parseHtmlToJsx(item?.content?.text)}</h6>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}

                                        <div className="flex-between border-2 border-grey-400 rounded-md p-4">
                                            <div className="flex flex-col items-center justify-center">
                                                {primarySelection?.propertyUnit?.ratePlans?.[0]?.priceDetails?.[0]?.dynamicRateRule?.description &&
                                                    <h4 className="p-medium-16 text-white bg-destructive px-2 rounded-md">-{primarySelection?.propertyUnit?.ratePlans?.[0]?.priceDetails?.[0]?.dynamicRateRule?.description}</h4>}
                                                <h2 className="h2-medium ">{primarySelection?.propertyUnit?.ratePlans?.[0]?.priceDetails?.[0]?.price?.lead?.currencyInfo?.symbol}{primarySelection?.propertyUnit?.ratePlans?.[0]?.priceDetails?.[0]?.price?.lead?.amount?.toFixed(2)}</h2>
                                            </div>


                                            <Link
                                                href={`/search/propertyDetail/unitReservation?id=${room?.unitId}&hotelName=${encodeURIComponent(summary?.name ?? '')}&hotelAddress=${encodeURIComponent(summary?.location?.address?.addressLine ?? '')}&price=${primarySelection?.propertyUnit?.ratePlans?.[0]?.priceDetails?.[0]?.price?.lead?.amount}&searchParams=${encodeURIComponent(JSON.stringify(searchParams))}&unit=${room?.header?.text}&unitImage=${encodedUnitImage}`}
                                                target="_blank"
                                            >
                                                <Button>Select</Button>
                                            </Link>

                                        </div>
                                    </div>
                                )}
                            </PopoverContent>
                        </Popover>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomCard;
