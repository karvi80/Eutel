"use client"

import React, { useRef } from 'react'
import Image from 'next/image';
import jsPDF from "jspdf"
import * as html2canvas from 'html2canvas';
import { useReactToPrint } from 'react-to-print';

import { Check, Printer, Save } from 'lucide-react';

interface ConfirmationProps {
    unitImage: string;
    unit: string | null;
    hotelName: string | null;
    confirmationNumber: string;
    address: string | null;
    checkIn: string | null;
    checkOut: string | null;
    TotalPrice: string | undefined;
    firstName: string;
    lastName: string;
    PhoneNumber: string;
    email: string;
    paymentInfo: {}
    cardholder: string;
    cardNumber: string;
    expirationDate: string;
    adults: string | null;
    children: string | null;
}

const ReservationConfirmation = ({ unitImage, unit, hotelName, confirmationNumber, address, checkIn, checkOut, TotalPrice, firstName, lastName, PhoneNumber, email, paymentInfo, cardholder, cardNumber, expirationDate, adults, children }: ConfirmationProps) => {

    const confirmationRef = useRef<HTMLDivElement>(null);

    const downloadPdf = async () => {
        const inputData = confirmationRef.current;

        try {
            const canvas = await (html2canvas as any)(inputData);
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: "a4"
            });

            const width = pdf.internal.pageSize.getWidth();
            const height = (canvas.height * width) / canvas.width;

            pdf.addImage(imgData, "png", 0, 0, width, height);
            pdf.save(`Reservation-${confirmationNumber}`);
        } catch (error) {
            console.log(error)
        }
    }


    const printConfirmation = useReactToPrint({
        content: () => confirmationRef.current as React.ReactInstance
    })


    return (
        <div
            className="relative w-full h-full rounded-lg bg-opacity-35 overflow-y-auto custom-scroll"
            style={{
                backgroundImage: 'linear-gradient(rgb(255, 255, 255, 0.7), rgb(255, 255, 255, 0.7)), url(/assets/images/dubai.jpg)', backgroundSize: 'cover',
            }}>

            <div className="flex-between p-3 gap-3 w-full">
                <div className="flex-center gap-3 ml-3 sticky">
                    <Save onClick={downloadPdf} className="cursor-pointer" />
                    <Printer onClick={printConfirmation} className="cursor-pointer" />
                </div>
            </div>
            <div
                id="confirmation-content"
                ref={confirmationRef}
                className="relative flex flex-col items-center justify-between w-full h-full text-center z-10 p-5 mt-5">
                <div className="w-full flex flex-col">
                    <div className="flex-center">
                        <h2>RESERVATION CONFIRMATION</h2>
                        <Check className="ml-2" />
                    </div>
                    <p>Thank you for trusting us, and your resrvation now is confirmed</p>
                </div>

                <div className="w-full flex flex-col">
                    <p>Confirmation Number: {confirmationNumber}</p>
                    <h2>{hotelName}</h2>
                </div>

                <div className="w-full flex flex-col">
                    <div className="w-full flex flex-col">
                        <div className="w-full flex-between">
                            <div className="w-[100px] h-[100px] rounded-lg overflow-hidden">
                                <img
                                    src={unitImage}
                                    alt="unit image"
                                    className="object-cover object-center w-full h-full"
                                />
                            </div>
                            <h2>{unit}</h2>
                        </div>
                        <p className="mt-3">{address}</p>
                    </div>

                    <div className="flex flex-col w-full mt-3">
                        <div className="flex-left gap-2">
                            <h5>check-in:</h5>
                            <h3>{checkIn} at 2PM</h3>
                        </div>
                        <div className="flex-left gap-2">
                            <h5>check-out:</h5>
                            <h3>{checkOut} at 12Pm</h3>
                        </div>

                        <div className="flex-left gap-2">
                            <h5>Total:</h5>
                            <h4>${TotalPrice}</h4>
                        </div>

                    </div>

                    <div className="flex flex-col text-left mt-3">
                        <h2>Guest Information</h2>
                        <h3>Name: <span>{firstName} {lastName}</span></h3>
                        <h3>Phone: <span>{PhoneNumber}</span></h3>
                        <h3>email: <span>{email}</span></h3>
                        <h3>Number of guests: <span>{adults} Adults {children ? `, and ${children} Children` : ''}</span></h3>

                    </div>

                    {cardholder &&
                        <div className="flex flex-col text-left mt-3">
                            <h2>Payment Details</h2>
                            <h3>Card holder: <span>{cardholder}</span></h3>
                            <h3>Card: <span>{cardNumber}</span></h3>
                            <h3>Expires: <span>{expirationDate}</span></h3>
                        </div>
                    }
                </div>

                <div className="mt-7">
                    <p>If you have any questions please don't hesitate to contact us.
                        We hope you will enjoy your stay with us!
                        Best Regard,
                        {hotelName}
                    </p>
                </div>
            </div>

        </div >
    )
}

export default ReservationConfirmation