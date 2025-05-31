"use client"

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { useRouter, useSearchParams } from 'next/navigation';

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

import { fetchPropertyDetail, fetchOffers } from '@/lib/fetchResults';
import { AvailableRoomProps, ParamsProps, PropertyDetailProps, RoomProps, SearchParamsProps } from '@/types';

import { Star } from 'lucide-react';


import RoomCard from '@/components/shared/RoomCard';
import ImageSlider from '@/components/shared/ImageSlider';
import PropertyThumbnail from '@/components/shared/PropertyThumbnail';
import LocationDetails from '@/components/shared/LocationDetails';
import Loader from '@/components/shared/Loader';


type Props = {
    searchParams: SearchParamsProps;
}




const PropertyDetails = ({ params }: ParamsProps) => {
    const router = useRouter();
    const { id } = params;
    const roomCardRef = useRef<HTMLDivElement>(null);


    const [propertyDetail, setPropertyDetail] = useState<PropertyDetailProps | null>(null);
    const [availableRooms, setAvailableRooms] = useState<AvailableRoomProps | null>(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [active, setActive] = useState(0);
    const [showDetails, setShowDetails] = useState<number | null>(null);
    const [roomsLoading, setRoomsLoading] = useState(false);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [searchParams, setSearchParams] = useState<{
        checkin: string | null, checkout: string |
        null, adults: string | null, children: string | null
    }>({
        checkin: null,
        checkout: null,
        adults: null,
        children: null,
    });




    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setSearchParams({
            checkin: urlParams.get('checkin'),
            checkout: urlParams.get('checkout'),
            adults: urlParams.get('adults'),
            children: urlParams.get('children'),
        })

    }, [])


    useEffect(() => {
        const getPropertyDetail = async () => {
            setDetailsLoading(true)
            setRoomsLoading(true)

            try {
                const detail = await fetchPropertyDetail(id);
                setPropertyDetail(detail);
                setDetailsLoading(false);

                const rooms = await fetchOffers(id, {
                    checkin: searchParams.checkin,
                    checkout: searchParams.checkout,
                    adults: searchParams.adults,
                });
                setAvailableRooms(rooms);
                console.log(rooms)
                setRoomsLoading(false);
            } catch (error) {
                console.error(error);
                setDetailsLoading(false);
                setRoomsLoading(false);
            }
        }

        if (searchParams.checkin && searchParams.checkout && searchParams.adults) {
            getPropertyDetail();
        }

    }, [params.id, searchParams]);

    useEffect(() => {
        setActive(imageIndex);
    }, [imageIndex]);

    if (detailsLoading || !propertyDetail) {
        return <div><Loader /></div>;
    }

    const { summary, propertyGallery, reviewInfo, propertyContentSectionGroups } = propertyDetail;


    const imageCount: number = propertyGallery?.images.length || 0;
    const slicedImages = propertyGallery?.images.slice(4, 10) || [];


    const showNextImage = () => {
        setImageIndex(index => (index === imageCount - 1 ? 0 : index + 1));

    }

    const showPrevImage = () => {
        setImageIndex(index => (index === 0 ? imageCount - 1 : index - 1));

    }


    const stripHtmlTags = (html: any) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };


    const scrollToRoomCardRef = () => {
        if (roomCardRef.current) {

            roomCardRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'start' })
        }
    }





    return (
        <div className="sm:w-full md:w-[75%]  mt-10 mx-auto p-4 flex flex-col">
            <div className="w-full flex flex-col xl:flex-row justify-between">
                <div className="flex flex-col text-left">
                    <h1 className="h2-bold text-primary">{summary?.name}</h1>
                    <h4 className="p-regular-16">{summary?.location?.address?.addressLine}</h4>
                </div>

                <div className="xl:flex-center flex-left">
                    <h1 className="h2-medium text-primary">{propertyDetail?.summary?.overview?.propertyRating?.rating}</h1>
                    <Star size={32} className="fill-primary text-primary" />
                </div>

                <div className="flex flex-col text-left">
                    <h2 className={`${propertyDetail?.reviewInfo.summary?.overallScoreWithDescriptionA11y?.value < 10 ? 'h1-bold text-primary' : 'h5-bold text-primary'}`}>{reviewInfo.summary?.overallScoreWithDescriptionA11y?.value}</h2>
                    <p className="p-medium-12">{reviewInfo?.summary?.propertyReviewCountDetails?.shortDescription}</p>
                </div>
            </div>

            {detailsLoading ? (
                <Loader />
            ) : (

                <div className="w-full flex-center my-20">
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="w-full h-full">
                                <PropertyThumbnail
                                    propertyGallery={propertyGallery}
                                    slicedImages={slicedImages}
                                    imageCount={imageCount}
                                />
                            </div>
                        </DialogTrigger>

                        <DialogContent className="h-[85vh] w-full md:min-w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">

                            <ImageSlider
                                images={propertyGallery?.images}
                                imageIndex={imageIndex}
                                active={active}
                                showNextImage={showNextImage}
                                showPrevImage={showPrevImage}
                                setImageIndex={setImageIndex}
                            />

                        </DialogContent>
                    </Dialog>
                </div>
            )
            }

            <div className="w-full flex-right">
                <Button onClick={scrollToRoomCardRef}
                >
                    Select Room and Reserve
                </Button>
            </div>


            <LocationDetails
                propertyDetail={propertyDetail}
                stripHtmlTags={stripHtmlTags}
            />




            {roomsLoading ? (
                <Loader />
            ) : (
                <div className="flex flex-col w-full">
                    <h1 className="h2-bold my-4">Select your rooms</h1>

                    <div ref={roomCardRef} className="flex item-start justify-center flex-wrap gap-3">
                        {availableRooms?.categorizedListings ?
                            availableRooms.categorizedListings.map((room, roomIndex: number) => (
                                <div id="room-card" key={roomIndex}>
                                    <RoomCard
                                        room={room as RoomProps}
                                        roomIndex={roomIndex}
                                        showDetails={showDetails}
                                        setShowDetails={setShowDetails}
                                        searchParams={searchParams}
                                        summary={summary}
                                        hotelName={summary?.name}
                                        hotelAddress={summary?.location?.address?.addressLine}
                                    />
                                </div>
                            ))
                            :
                            <div className="w-full flex-center text-center">
                                <h1 className="h3-bold text-coral-500">We are Sorry! <br />All Rooms are Sold out for this date</h1>
                            </div>
                        }
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default PropertyDetails