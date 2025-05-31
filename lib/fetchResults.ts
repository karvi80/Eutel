
import axios from 'axios';

import { SearchParamsProps, searchProps } from '@/types';




const Headers = {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_APP_RAPIAPI_KEY,
    'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com',
}

const fetchLocationData = async (location: string) => {
    const options = {
        method: 'GET',
        url: 'https://hotels-com-provider.p.rapidapi.com/v2/regions',
        params: {
            query: location,
            domain: 'US',
            locale: 'en_US',
        },
        headers: Headers
    }

    try {
        const response = await axios.request(options);
        console.log(response.data)
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const fetchHotelData = async ({ regionId, checkin, checkout, adults, children }: SearchParamsProps) => {

    const options = {
        method: 'GET',
        url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/search',
        params: {
            checkout_date: checkout,
            adults_number: adults,
            checkin_date: checkin,
            region_id: regionId,
            sort_order: 'REVIEW',
            locale: 'en_US',
            domain: 'US',
            children_ages: children,
        },
        headers: Headers,
    }

    try {
        const response = await axios.request(options);
        const hotelData = response.data.properties
        console.log(hotelData);
        return hotelData;

    } catch (error) {
        console.error(error);
        throw error;
    }
};


const fetchPropertyDetail = async (id: string) => {
    const options = {
        method: 'GET',
        url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/details',
        params: {
            domain: 'US',
            hotel_id: id,
            locale: 'en_US'
        },
        headers: Headers
    }

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const fetchOffers = async (id: string, { checkin, checkout, adults }: SearchParamsProps) => {
    const options = {
        method: 'GET',
        url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/offers',
        params: {
            checkin_date: checkin,
            checkout_date: checkout,
            adults_number: adults,
            hotel_id: id,
            locale: 'en_US',
            domain: 'US',

        },
        headers: Headers
    }


    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



export { fetchLocationData, fetchHotelData, fetchPropertyDetail, fetchOffers };
