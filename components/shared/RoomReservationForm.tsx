import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface RoomReservationFormProps {
    firstName: string;
    lastName: string;
    phoneNumber: string; // Added phoneNumber prop
    index: number;
    onDelete: (index: number) => void;
    onFirstNameChange: (index: number, value: string) => void;
    onLastNameChange: (index: number, value: string) => void;
    onPhoneNumberChange: (index: number, value: string) => void; // Added phoneNumber change handler
}

const RoomReservationForm: React.FC<RoomReservationFormProps> = ({
    firstName, lastName, phoneNumber, index, onDelete,
    onFirstNameChange, onLastNameChange, onPhoneNumberChange
}) => {
    return (
        <div className="relative flex flex-col w-full mt-5 border-2 border-grey-400 rounded-md p-4">
            <h2>Who's checking in?</h2>
            <div className="mt-3 flex flex-col md:flex-row md:space-x-4">
                <div className="grid w-full mt-3 max-w-sm items-center gap-1.5">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                        type="text"
                        id="first-name"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => onFirstNameChange(index, e.target.value)}
                    />
                </div>
                <div className="grid w-full mt-3 max-w-sm items-center gap-1.5">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                        type="text"
                        id="last-name"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => onLastNameChange(index, e.target.value)}
                    />
                </div>
            </div>

            <div className="grid w-full mt-3 max-w-sm items-center gap-1.5">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                    type="text"
                    id="phone"
                    placeholder="Your phone number"
                    value={phoneNumber}
                    onChange={(e) => onPhoneNumberChange(index, e.target.value)}
                />
            </div>

            <div className="grid w-full mt-6 items-center gap-1.5">
                <h4 className="h5-bold">Special requests</h4>
                <p className="p-medium-12 ">Special requests can't be guaranteed, but the property will do its best to meet your needs. You can always make a special request after your booking is complete.</p>
                <Label htmlFor="special-request">Please write your requests</Label>
                <Input type="text" id="special-request" placeholder="" />
            </div>

            {index > 0 &&
                <div className="absolute top-0 right-0 p-3 cursor-pointer">
                    <Button variant="ghost" onClick={() => onDelete(index)}>
                        <X />
                    </Button>
                </div>
            }
        </div>
    );
};

export default RoomReservationForm;
