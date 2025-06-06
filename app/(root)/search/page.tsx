

import Link from "next/link";
import dynamic from "next/dynamic";
import PropertyCard from "@/components/shared/PropertyCard";
import { fetchHotelData } from "@/lib/fetchResults";
import { PropertyProps, SearchParamsProps } from "@/types";
import { differenceInDays, isValid, parseISO } from "date-fns";
import ServerError from "@/components/shared/ServerError";
import { Button } from "@/components/ui/button";




type Props = {
    searchParams: SearchParamsProps;
}

const generatePageNumbers = (
    currentPage: number,
    totalPages: number
): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
        // If there are 5 or fewer pages, show all
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        // Always show the first page
        pages.push(1);

        // Add dots if the current page is greater than 3
        if (currentPage > 3) pages.push("...");

        // Add the two pages before and after the current page
        const start = Math.max(2, currentPage - 2);
        const end = Math.min(totalPages - 1, currentPage + 2);

        for (let i = start; i <= end; i++) pages.push(i);

        // Add dots if the current page is more than 2 away from the last page
        if (currentPage < totalPages - 2) pages.push("...");

        // Always show the last page
        pages.push(totalPages);
    }

    return pages;
};

async function SearchResultsPage({ searchParams }: Props) {

    // Lazy load PropertyCard
    const LazyPropertyCard = dynamic(() => import("@/components/shared/PropertyCard"), { ssr: false });

    const properties = await fetchHotelData(searchParams);

    const { regionId, checkin, checkout, adults, children, page } = searchParams

   

    let numNights = 0

    if (checkin && checkout) {
        let checkinDate = parseISO(checkin);
        let checkoutDate = parseISO(checkout);

        // Check if dates are valid
        if (!isValid(checkinDate)) {
            checkinDate = new Date(checkin);
        }
        if (!isValid(checkoutDate)) {
            checkoutDate = new Date(checkout);
        }

        numNights = differenceInDays(checkoutDate, checkinDate);
    }

    const currentPage = parseInt(String(searchParams.page || "1"), 10);
    const propertiesPerPage = 20;

    const totalProperties = properties?.length || 0;
    const totalPages = totalProperties > 0 ? Math.ceil(totalProperties / propertiesPerPage) : 0;

    if (totalPages === 0) {
        return (
            <div>
                <h1>No properties available</h1>
            </div>
        );
    }

    const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages || 1);
    const pages = generatePageNumbers(validCurrentPage, totalPages);


    return (
        <div className="w-full lg:max-w-[80%] mx-auto mt-10 p-4">
            {properties ?
                <div>
                    <h1 className="h5-bold" > Your Stay Results</h1 >
                    <p className="p-regular-16">From <span className="text-coral-500">{checkin}</span> to <span className="text-coral-500">{checkout}</span></p>
                    <h1 className="p-regular-16"><span className="text-coral-500">{properties?.length}</span> properties found</h1>
                    {
                        properties.slice((validCurrentPage - 1) * propertiesPerPage, validCurrentPage * propertiesPerPage).map((property: PropertyProps) => (
                            <div
                                key={property.id}
                            >
                                <Link
                                    href={{
                                        pathname: `/search/propertyDetail/${property.id}`,
                                        query: {
                                            checkin: checkin,
                                            checkout: checkout,
                                            adults: adults,
                                            children: children
                                        }
                                    }}
                                >
                                    <LazyPropertyCard
                                        imageUrl={property?.propertyImage?.image?.url}
                                        name={property.name}
                                        distance={property?.destinationInfo?.distanceFromDestination?.value}
                                        unit={property?.destinationInfo?.distanceFromDestination?.unit}
                                        neighborhood={property?.neighborhood?.name}
                                        score={property?.reviews?.score}
                                        reviewCount={property?.reviews?.total}
                                        stay={numNights}
                                        adults={adults}
                                        children={children}
                                        price={property?.price?.lead?.formatted}
                                        priceRate={property?.price?.priceMessages[0]?.value}
                                        availableRooms={property?.availability?.minRoomsLeft}
                                    />
                                </Link>
                            </div>
                        ))
                    }

                    {/* Pagination controls */}
                    <div className="flex justify-center mt-6">
                        {pages.map((pageNumber, index) => (
                            typeof pageNumber === "string" ? (
                                <span key={index} className="mx-1 px-3 py-1 text-gray-500">
                                    {pageNumber}
                                </span>
                            ) : (
                                <Link key={index}
                                    href={{
                                        pathname: "/search",
                                        query: {
                                            ...Object.fromEntries(
                                                Object.entries(searchParams).filter(([key, value]) =>
                                                    typeof value === "string" ||
                                                    typeof value === "number" ||
                                                    typeof value === "boolean" ||
                                                    value === null ||
                                                    value === undefined
                                                )
                                            ),
                                            page: pageNumber.toString()
                                        }
                                    }}
                                >
                                    <Button
                                        aria-current={validCurrentPage === pageNumber ? "page" : undefined}
                                        variant="ghost"
                                        className={`mx-1 border ${validCurrentPage === pageNumber
                                            ? "bg-coral-500 text-white hover:text-coral-500"
                                            : "bg-white text-coral-500"
                                            } rounded-full border-coral-500`}>
                                        {pageNumber}
                                    </Button>
                                </Link>
                            )
                        ))}
                    </div>
                </div>
                : (
                    <ServerError />
                )
            }
        </div >
    );
};

export default SearchResultsPage;
