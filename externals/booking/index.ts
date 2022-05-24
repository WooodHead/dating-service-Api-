import fetch from 'node-fetch';
import * as QS from 'query-string';

import { BOOKING_BASE_URL } from './configs';
import { Booking } from './types';

const fetchBooking = async (args: {
  url: string;
  query?: Record<string, any>;
}) => {
  const query = QS.stringify(args.query || {});
  return fetch(`${BOOKING_BASE_URL}${args.url}?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': process.env.BOOKING_RAPID_API_HOST,
      'x-rapidapi-key': process.env.BOOKING_RAPID_API_KEY,
    },
  });
};

export const searchHotel = async (
  query: Booking.HotelSearchAPIPayload,
): Promise<Booking.HotelSearchAPIResponse> => {
  try {
    const resp = await fetchBooking({
      url: '/hotels/search-by-coordinates',
      query,
    });
    const data = await resp.json();
    return data as Booking.HotelSearchAPIResponse;
  } catch (e) {
    throw e;
  }
};

export const getHotelDetail = async (
  params: Booking.HotelDetailAPIPayload,
): Promise<Booking.HotelDetailAPIResponse> => {
  const resp = await fetchBooking({ url: `/hotels/${params.id}` });
  const data = await resp.json();
  return data as Booking.HotelDetailAPIResponse;
};
