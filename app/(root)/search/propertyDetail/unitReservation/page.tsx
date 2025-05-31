"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { differenceInDays, isValid, parseISO } from 'date-fns';
import RoomReservationForm from '@/components/shared/RoomReservationForm';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ReservationConfirmation from '@/components/shared/ReservationConfirmation';
import Loader from '@/components/shared/Loader';



interface ReservationFormParams {
  checkin: string | null;
  checkout: string | null;
  adults: string | null;
  children: string | null;
  price: string | null;
  unit: string | null;
  unitImage: string | null;
  hotelName: string | null,
  hotelAddress: string | null,
}

interface RoomInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const UnitReservation = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [numNights, setNumNights] = useState<number | null>(null);
  const [moreRoom, setMoreRoom] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [rooms, setRooms] = useState<number[]>([0]);
  const [roomInfo, setRoomInfo] = useState<RoomInfo[]>([{ firstName: '', lastName: '', phoneNumber: '' }]);
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [paymentInfo, setPaymentInfo] = useState({
    cardholderName: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
  });
  const [includePayment, setIncludePayment] = useState(false);
  const [reservationFormParams, setReservationFormParams] = useState<ReservationFormParams>({
    checkin: null,
    checkout: null,
    adults: null,
    children: null,
    price: null,
    unit: null,
    unitImage: null,
    hotelName: null,
    hotelAddress: null,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const unitImage = urlParams.get('unitImage') ? decodeURIComponent(urlParams.get('unitImage')!) : null;
    const price = urlParams.get('price');
    const unit = urlParams.get('unit');
    const hotelName = urlParams.get('hotelName')
    const hotelAddress = urlParams.get('hotelAddress')
    console.log(hotelName)
    console.log(hotelAddress)

    const searchParams = urlParams.get('searchParams');
    let checkin = null, checkout = null, adults = null, children = null;

    if (searchParams) {
      const parsedSearchParams = JSON.parse(decodeURIComponent(searchParams));
      checkin = parsedSearchParams.checkin;
      checkout = parsedSearchParams.checkout;
      adults = parsedSearchParams.adults;
      children = parsedSearchParams.children;
    }
    setReservationFormParams(prevParams => ({
      ...prevParams,
      checkin,
      checkout,
      adults,
      children,
      price,
      unit,
      unitImage,
      hotelName,
      hotelAddress,
    }));

    if (checkin && checkout && price) {
      let checkinDate = parseISO(checkin);
      let checkoutDate = parseISO(checkout);

      if (!isValid(checkinDate)) {
        checkinDate = new Date(checkin);
      }
      if (!isValid(checkoutDate)) {
        checkoutDate = new Date(checkout);
      }

      const numNights = differenceInDays(checkoutDate, checkinDate);
      const pricePerNight = parseFloat(price);

      if (!isNaN(numNights) && !isNaN(pricePerNight)) {
        setNumNights(numNights);
        setTotalPrice(numNights * pricePerNight);
      } else {
        console.error('Invalid number of nights or price per night:', { numNights, pricePerNight });
        setTotalPrice(null);
      }
    } else {
      console.error('Missing required parameters for total price calculation');
    }

    setLoading(false);
  }, []);

  const taxRate = totalPrice !== null ? totalPrice * 0.08875 : null;
  const finalPriceWithTaxesPerRoom = totalPrice !== null && taxRate !== null ? totalPrice + taxRate : null;
  const finalPriceWithTaxes = finalPriceWithTaxesPerRoom !== null ? finalPriceWithTaxesPerRoom * rooms.length : null;

  const addRoom = () => {
    setRooms([...rooms, rooms.length]);
    setRoomInfo([...roomInfo, { firstName: '', lastName: '', phoneNumber: '' }]);
    setMoreRoom(false);
  };

  const deleteRoom = (index: number) => {
    setRooms(rooms.filter((_, i) => i !== index));
    setRoomInfo(roomInfo.filter((_, i) => i !== index));
  };

  const handleFirstNameChange = (index: number, value: string) => {
    const updatedRoomInfo = [...roomInfo];
    updatedRoomInfo[index].firstName = value;
    setRoomInfo(updatedRoomInfo);
  };

  const handleLastNameChange = (index: number, value: string) => {
    const updatedRoomInfo = [...roomInfo];
    updatedRoomInfo[index].lastName = value;
    setRoomInfo(updatedRoomInfo);
  };

  const handlePhoneNumberChange = (index: number, value: string) => {
    const updatedRoomInfo = [...roomInfo];
    updatedRoomInfo[index].phoneNumber = value;
    setRoomInfo(updatedRoomInfo);
  };

  const encryptedCardNumber = (cardNumber: string): string => {
    if (cardNumber.length < 4) {
      return cardNumber; // Return the original card number if it's less than 4 digits.
    }
    const lastFourDigits = cardNumber.slice(-4);
    const maskedDigits = cardNumber.slice(0, -4).replace(/\d/g, 'x');
    return `${maskedDigits} ${lastFourDigits}`;
  }

  const generateConfirmationNumber = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let confirmationNumber = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      confirmationNumber += chars[randomIndex];
    }
    return confirmationNumber;
  };

  if (loading) {
    return <div><Loader /></div>;
  }

  const firstRoom = roomInfo[0];

  return (
    <div className="sm:w-full md:w-[75%] mt-10 mx-auto p-4 flex flex-col">
      <h1 className="h2-bold">Your reservation details For: <span className="h2-bold text-primary"></span></h1>
      <div>
        <p>Check-in: {reservationFormParams.checkin}</p>
        <p>Check-out: {reservationFormParams.checkout}</p>
        <p>
          For {reservationFormParams.adults} Adults
          {reservationFormParams.children ? `, and ${reservationFormParams.children} Children` : ''}
        </p>

        <div className="flex flex-col w-full items-center justify-center mt-3 border-2 border-grey-400 rounded-md p-4">
          <div className="w-full flex-col items-center justify-center md:flex md:flex-row md:justify-center md:items-center">
            <div className="w-[100px] h-[100px] rounded lg overflow-hidden mr-4">
              <img
                src={reservationFormParams.unitImage || ''}
                alt="unit image"
                className="object-cover object-center w-full h-full"
              />
            </div>

            <div className="w-full flex items-start justify-between flex-1">
              <h3 className="h3-medium text-coral-500">{reservationFormParams.unit}</h3>
              <p>Price per night: ${reservationFormParams.price}</p>
            </div>
          </div>

          <div className="w-full flex-between">
            <div className="flex flex-col items-left">
              <h6>Your price for {numNights} night{numNights !== 1 ? 's' : ''}:</h6>
              <h6>Taxes and fees:</h6>
              <h6>{`Total: ${rooms.length > 1 ? `for ${rooms.length} rooms` : ''}`}</h6>
            </div>

            <div className="flex flex-col items-right">
              {totalPrice !== null && <h3 className=""> ${totalPrice.toFixed(2)}</h3>}
              <h4>${taxRate?.toFixed(2)}</h4>
              <Separator />
              <h4 className="h3-medium text-coral-500">${finalPriceWithTaxes?.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      </div>

      {rooms.map((room, index) => (
        <RoomReservationForm
          key={room}
          index={index}
          firstName={roomInfo[index].firstName}
          lastName={roomInfo[index].lastName}
          phoneNumber={roomInfo[index].phoneNumber}
          onDelete={deleteRoom}
          onFirstNameChange={handleFirstNameChange}
          onLastNameChange={handleLastNameChange}
          onPhoneNumberChange={handlePhoneNumberChange}
        />
      ))}

      <div className="flex items-center space-x-2 mt-4">
        <Checkbox
          id="terms"
          checked={moreRoom}
          onCheckedChange={addRoom}
        />
        <label
          htmlFor="add-room"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Add another room
        </label>

      </div>

      <div>
        <div className="flex-left w-full mt-3 max-w-sm items-center gap-1.5">
          <Checkbox
            id="include-payment"
            checked={includePayment}
            onCheckedChange={(checked) => setIncludePayment(checked === true)}
          />
          <Label htmlFor="include-payment">Add Payment Information</Label>
        </div>
        {includePayment && (
          <div className="relative flex flex-col w-full mt-5 border-2 border-grey-400 rounded-md p-4">
            <div className="grid w-full mt-3 max-w-sm items-center gap-1.5">
              <Label htmlFor="cardholder-name">Cardholder Name:</Label>
              <Input
                id="cardholder-name"
                type="text"
                value={paymentInfo.cardholderName}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardholderName: e.target.value })}
                required
              />
            </div>

            <div className="grid w-full mt-3 max-w-sm items-center gap-1.5">
              <Label htmlFor="card-number">Card Number:</Label>
              <Input
                id="card-number"
                type="text"
                value={paymentInfo.cardNumber}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                required
              />
            </div>

            <div className="grid w-full mt-3 max-w-sm items-center gap-1.5">
              <Label htmlFor="expiration-date">Expiration Date:</Label>
              <Input
                id="expiration-date"
                type="text"
                value={paymentInfo.expirationDate}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, expirationDate: e.target.value })}
                required
              />
            </div>

            <div className="grid w-full mt-3 max-w-sm items-center gap-1.5">
              <Label htmlFor="security-code">Security Code:</Label>
              <Input
                id="security-code"
                type="text"
                value={paymentInfo.securityCode}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, securityCode: e.target.value })}
                required
              />
            </div>
          </div>
        )}
      </div>

      <div className="grid w-full mt-3 max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-full flex-center p-20">
        <Dialog>
          <DialogTrigger>
            <Button type="submit" className="mt-3 max-w-sm">Complete Booking</Button>
          </DialogTrigger>

          <DialogContent className="w-full h-full m-0 p-0 ">
            <ReservationConfirmation
              unitImage={reservationFormParams.unitImage || ''}
              unit={reservationFormParams.unit}
              confirmationNumber={generateConfirmationNumber()}
              hotelName={reservationFormParams.hotelName}
              address={reservationFormParams.hotelAddress}
              checkIn={reservationFormParams.checkin}
              checkOut={reservationFormParams.checkout}
              TotalPrice={finalPriceWithTaxes?.toFixed(2)}
              firstName={firstRoom.firstName}
              lastName={firstRoom.lastName}
              PhoneNumber={firstRoom.phoneNumber}
              email={email}
              paymentInfo={paymentInfo}
              cardholder={paymentInfo.cardholderName}
              cardNumber={encryptedCardNumber(paymentInfo.cardNumber)}
              expirationDate={paymentInfo.expirationDate}
              adults={reservationFormParams.adults}
              children={reservationFormParams.children}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UnitReservation;
