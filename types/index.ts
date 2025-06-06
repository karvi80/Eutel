export interface citiesProps {
    cities: CityProps[];
}

export interface CityProps {
    location: string,
    img: string,
    desc: string
}

export interface searchProps {

    regionId: string;
    checkin: string | null | undefined;
    checkout: string | null | undefined;
    adults: string | undefined;
    children: string | null | undefined;
    rooms: string;

}

export interface ParamsProps {
    params: {
        id: string;
    }
}

export interface SearchParamsProps {

    url?: URL | string;
    regionId?: string;
    checkin?: string | null | undefined;
    checkout?: string | null | undefined;
    adults?: string | null;
    children?: string | null;
    rooms?: string;
    location?: string;
    page?: number;
    pageNumnber?: number;
    limit?: number;
    params?: string;

    dates?: {
        from: Date | null;
        to: Date | null;
    };
    onSubmit?: () => void;
    searchParams?: React.SetStateAction<{}> | undefined;
    SearchForm?: () => React.JSX.Element | null;
}





export interface hotelDataProps {
    hotelData: {};
    property: {};
}

export interface PropertyProps {
    name: string;
    id: string;
    availability: {
        available: boolean;
        minRoomsLeft: number;
    };

    reviews: {
        score: number;
        total: number;
    }

    price: {
        lead: {
            formatted: string;
        };
        priceMessages: {
            value: string;
        }[];
    }

    neighborhood: {
        name: string;
    }

    stay: number;
    adults: string;
    children: string;

    propertyImage: {
        image: {
            url: string;
            description: string;
        }
    }

    destinationInfo: {
        distanceFromDestination: {
            value: number;
            unit: string;
            __typename: string;
        }
    }
}


export interface PropertyCardProps {
    imageUrl: string;
    name: string;
    distance: number;
    unit: string;
    neighborhood: string;
    score: number;
    reviewCount: number;
    stay: number | null;
    adults: string | null | undefined;
    children?: string | null | undefined;
    price: string;
    priceRate: string;
    availableRooms: number
    propertyLink?: string;
}

// start of availableRoom and RoomCard types
export interface AvailableRoomProps {
    categorizedListings: RoomCardProps[];
};

export interface RoomCardProps {
    room: RoomProps;
    summary: {
        name: string;
        location: {
            address: {
                addressLine: string;
            }
        }
    };
    roomIndex: number;
    showDetails: number | null;
    setShowDetails: React.Dispatch<React.SetStateAction<number | null>>;
    searchParams: SearchParamsProps;
    hotelName: string;
    hotelAddress: string;
}

export interface RoomProps {
    unitId?: string;
    header?: Header;
    featureHeader?: FeatureHeader;
    features?: Feature[];
    primarySelections?: PrimarySelection[];
}

export interface Header {
    text?: string;
}

export interface FeatureHeader {
    text?: string;
}

export interface Feature {
    text?: string;
    __typename: string;
}

export interface UnitImage {
    image: {
        description: string;
        url: string;
    };
}

export interface PrimarySelection {
    __typename: string;
    propertyUnit: PropertyUnit;
}

export interface PropertyUnit {
    unitGallery?: {
        gallery: UnitImage[];
    };
    roomAmenities?: RoomAmenities;
    ratePlans?: RatePlan[];
}

export interface RoomAmenities {
    header?: {
        text: string;
    };
    bodySubSections?: BodySubSection[];
}

export interface BodySubSection {
    __typename: string;
    contents?: Content[];
}

export interface Content {
    __typename: string;
    header?: {
        text?: string;
    };
    items?: Item[];
}

export interface Item {
    __typename: string;
    content?: {
        text?: string;
    };
}

export interface RatePlan {
    priceDetails?: PriceDetail[];
}

export interface PriceDetail {
    dynamicRateRule: {
        description?: string;
        discountPercent?: string;
    }
    price?: {
        lead?: {
            currencyInfo?: {
                symbol: string;
            };
            amount?: number;
        };
    };
}
// end of roomCard types



// start of PropertyDetails types
export interface PropertyDetailProps {
    summary: SummaryProps;

    propertyGallery: PropertyGalleryProps;

    reviewInfo: ReviewInfoaparops;

    propertyContentSectionGroups: PropertyContentSectionGroupsProps;

    slicedImages: ImageProps[];
    slicedImage: ImageProps;
    imageCount: number;
}
// start of Summary type
export interface SummaryProps {
    location: LocationProps;
    name: string;
    overview: OverviewProps;
}

export interface LocationProps {
    address: {
        addressLine: string;
    };
    whatsAround: {
        editorial: {
            content: string[];
        };
    };
}

export interface OverviewProps {
    propertyRating: {
        rating: number;
    };
}
// end of Summary type


// start of propertyGallery type
export interface PropertyGalleryProps {
    images: ImageProps[];
    slicedImages: ImageProps[];
    slicedImage: ImageProps;
    imageCount: number;
}

export interface ImageProps {
    imageId: string;
    __typename: string;
    image: {
        url: string;
        description: string;
    }
}
// end of propertyGallery type

// start of reviewInfo type
export interface ReviewInfoaparops {
    summary: {
        overallScoreWithDescriptionA11y: {
            value: number;
        };
        propertyReviewCountDetails: {
            shortDescription: string;
        };
    }
}
// end of reviewInfo type


// start of PropertyContentSectionGroups type
export interface PropertyContentSectionGroupsProps {
    aboutThisProperty: AboutThisPropertyProps;
    policies: PoliciesProps;
}

// start of aboutThisProperty type
export interface AboutThisPropertyProps {
    sections: {
        __typename: string;
        header: {
            text: string;
        };
        bodySubSections: {
            elements: {
                header: {
                    text: string;
                };
                items: {
                    content: {
                        text: string;
                        primary?: {
                            value: string;
                        };
                    }
                }[];
            }[];
        }[];
    }[];
}
// end of aboutThisProperty type


// start of policy type
export interface PoliciesProps {
    sections: {
        header: {
            text: string;
        };
        bodySubSections: {
            elements: {
                header: {
                    text: string;
                };
                items: {
                    content: {
                        text: string;
                        primary?: {
                            value: string;
                        }
                    };
                    contents: {
                        primary: {
                            value: string;
                        };
                    }[];
                }[];
            }[];
        }[];
    }[];
}
// end of policy type
// end of PropertyContentSectionGroups type




