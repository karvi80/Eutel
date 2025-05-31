"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import React, { useEffect, useState } from 'react'

import { useRouter } from "next/navigation"
import { usePathname, useSearchParams } from 'next/navigation'
import { SubmitHandler, useForm } from "react-hook-form"

import Image from 'next/image'

import { cn } from "@/lib/utils"
import { fetchLocationData } from '@/lib/fetchResults';

import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { Button } from '../ui/button'
import { Calendar } from "@/components/ui/calendar"
import { BedDoubleIcon, Calendar as CalendarIcon } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



import { Input } from "@/components/ui/input"
import { SearchParamsProps } from "@/types"
import SearchLoader from "@/components/shared/SearchLoader"



export const formSchema = z.object({
    location: z.string().min(2, "Must be min of 2 characters").max(50),
    dates: z.object({
        from: z.date(),
        to: z.date(),
    }),
    adults: z.string().min(1, {
        message: "Please select at least 1 adult",
    })
        .max(4, { message: "max 4 adults Occupancy" }),
    children: z.string().min(0).max(4, {
        message: "max 4 children Occupancy",
    }),
    rooms: z.string().min(1, {
        message: "Please select at least 1 room"
    })
})




const SearchForm = () => {

    const [searchResults, setSearchResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false)


    const router = useRouter();
    const pathname = usePathname();





    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            location: "",
            dates: {
                from: undefined,
                to: undefined,
            },
            adults: "1",
            children: "0",
            rooms: "1",
        },

    });


    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {

        setIsOpen(true)

        const checkin_monthday = values.dates.from.getDate().toString();
        const checkin_month = (values.dates.from.getMonth() + 1).toString();
        const checkin_year = values.dates.to.getFullYear().toString();
        const checkout_monthday = values.dates.to.getDate().toString();
        const checkout_month = (values.dates.to.getMonth() + 1).toString();
        const checkout_year = values.dates.to.getFullYear().toString();
        const checkin = `${checkin_year}-${checkin_month}-${checkin_monthday}`;
        const checkout = `${checkout_year}-${checkout_month}-${checkout_monthday}`


        try {

            // Fetch the location data using the lib function
            const locationResults = await fetchLocationData(values.location);

            // Update the state with the location results
            setSearchResults(locationResults);

            // Access the first result (assuming it exists)
            if (locationResults.length > 0) {
                const firstResult = locationResults[0];

                // Use the gaiaId as the region_id for hotel search
                const regionId = firstResult.gaiaId;
                console.log(regionId)


                // Navigating to the results page or handling the data
                const url = new URL('/search', window.location.origin);
                url.searchParams.set("location", values.location);
                url.searchParams.set("regionId", regionId);
                url.searchParams.set("checkin", checkin);
                url.searchParams.set("checkout", checkout);
                url.searchParams.set("adults", values.adults);
                url.searchParams.set("children", values.children);
                url.searchParams.set("rooms", values.rooms);

                router.push(url.href);
                console.log(url.href)

            }
        }
        catch (error) {
            console.error(error);
        }


    };


    return (
        <AlertDialog open={isOpen}>
            <AlertDialogTitle></AlertDialogTitle>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col items-end lg:flex-row gap-4 lg:2 px-3 py-5 -mb-8 mx-auto bg-white rounded-lg shadow-2xl"
                >
                    <div className="grid w-full lg:max-w-sm items-center gap-1.5 ">
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>

                                    <FormLabel className="text-primary">Location</FormLabel>

                                    <FormMessage />

                                    <FormControl>
                                        <Input placeholder="Enter City or Region" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid w-full lg:max-w-sm flex-1 items-center gap-1.5">
                        <FormField
                            control={form.control}
                            name="dates"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="text-primary">Dates</FormLabel>
                                    <FormMessage />

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    id="date"
                                                    name="dates"
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full lg:w-[300px] justify-start text-left font-normal",
                                                        !field.value.from && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-3 w-4 h-4 opacity-50" />
                                                    {field.value?.from ? (
                                                        field.value?.to ? (
                                                            <>
                                                                {format(field.value?.from, "LLL dd, y")} -{" "}
                                                                {format(field.value?.to, "LLL dd, y")}
                                                            </>
                                                        ) : (
                                                            format(field.value?.from, "LLL dd, y")
                                                        )
                                                    ) : (
                                                        <span>Select your Date</span>

                                                    )}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                selected={field.value}
                                                defaultMonth={field.value.from}
                                                onSelect={field.onChange}
                                                numberOfMonths={2}
                                                disabled={(date) =>
                                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full flex-around space-x-2">
                        <div className="grid items-center flex-1 mt-2">
                            <FormField
                                control={form.control}
                                name="adults"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-primary">Adults</FormLabel>
                                        <FormMessage />
                                        <FormControl>
                                            <Input type="number" placeholder="Adults" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid items-center flex-1 mt-2">
                            <FormField
                                control={form.control}
                                name="children"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-primary">Children</FormLabel>
                                        <FormMessage />
                                        <FormControl>
                                            <Input type="number" placeholder="children" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid items-center flex-1 mt-2">
                            <FormField
                                control={form.control}
                                name="rooms"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-primary">Rooms</FormLabel>
                                        <FormMessage />
                                        <FormControl>
                                            <Input type="number" placeholder="rooms" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="lg:flex lg:items-end lg:justify-center my-4 lg:my-0 h-full w-full">
                        <Button type="submit" className="w-full">Search</Button>
                    </div>
                </form>
            </Form>


            <AlertDialogContent className="border-0">
                <AlertDialogDescription></AlertDialogDescription>
                <SearchLoader />
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SearchForm