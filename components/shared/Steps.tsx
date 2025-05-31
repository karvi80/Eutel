import React from "react";
import Image from "next/image"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const Steps = () => {
    return (
        <div className="w-full mt-20 flex items-start justify-between">
            <div className="flex flex-col flex-grow-1">
                <h1 className="h2-bold">Book your next trip <br /> in 3 easy steps</h1>

                <div className="flex flex-col mt-3 space-y-6 max-w-[400px]">
                    <div className="flex items-start justify-start max-w-full">
                        <Image src="/assets/images/destination.png" alt="destination" width={44} height={44} />
                        <div className="ml-2">
                            <h4 className="p-bold-16">Choose Destination</h4>
                            <p className="p-regular-14">Ever get the sudden urge to pack your stuff and go somewhere? finding cheap flights and stay.</p>
                        </div>
                    </div>
                    <div className="flex items-start justify-start max-w-full">
                        <Image src="/assets/images/payment.png" alt="payment" width={44} height={44} />
                        <div className="ml-2">
                            <h4 className="p-bold-16">Make Payment</h4>
                            <p className="p-regular-14">Our flexible plan make payment easy as you can either using one card or split payment, or buy now pay later method at checkout to pay in interest-free installments.</p>
                        </div>
                    </div>
                    <div className="flex items-start justify-start max-w-full">
                        <Image src="/assets/images/aeroport.png" alt="aeroport" width={44} height={44} />
                        <div className="ml-2">
                            <h4 className="p-bold-16">Keep yourself updated</h4>
                            <p className="p-regular-14">Our IA system can keep you up to date and will remind you with everything you need to pck, and real time traffic to the airport.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative flex-center w-[400px] h-full hidden lg:block !hidden lg:!block shadow-2xl rounded-lg">
                <div className="w-full p-10 bg-coral-500 bg-opacity-50 rounded-lg">
                    <Image src="/assets/images/iconic.jpeg" alt="iconic" width={350} height={250}
                        className="rounded-lg" />
                </div>

                <div className="flex flex-col absolute -right-10 -top-8 bg-white p-2 rounded-lg shadow-2xl">
                    <h4 className="p-bold-18">We don't remember days, <br /> we remember moments.</h4>

                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center justify-start gap-2">
                            <Image src="/assets/icons/map.png" alt="map" width={16} height={16} />
                            <Image src="/assets/icons/share.png" alt="share" width={16} height={16} />
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="p-medium-12 text-gray-400 -mb-2">Saving memories</p>
                            <Image src="/assets/icons/loading.png" alt="loading" width={100} height={20} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Steps;
