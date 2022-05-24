import fetch from 'node-fetch';
import * as QS from 'query-string';
import { format } from 'date-fns';

import { HourlySearch } from 'types/search';

import * as configs from './configs';
import { Meetup } from './types';

const fetchMeetup = async (args: {
  url: string;
  query?: Record<string, any>;
}) => {
  const query = QS.stringify({
    ...(args.query || {}),
  });
  return fetch(`${configs.MEETUP_BASE_URL}${args.url}?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const searchEvent = async (
  query: Meetup.EventSearchAPIPayload,
): Promise<Meetup.EventSearchAPIResponse> => {
  const resp = await fetchMeetup({
    url: '/find/upcoming_events',
    query: {
      ...query,
      fields: ['featured_photo', 'plain_text_description'].join(','),
    },
  });
  const data = await resp.json();
  return data as Meetup.EventSearchAPIResponse;
};

const getValidCategories = (query: HourlySearch.Options): string[] => {
  if (!query?.categoryIds) {
    return [];
  }
  return Object.keys(query.categoryIds).filter((cid) =>
    configs.validCategories.includes(cid as any),
  );
};

export const search = async (
  query: HourlySearch.Options,
): Promise<HourlySearch.Response> => {
  const validCategories = getValidCategories(query);
  if (validCategories.length === 0) {
    return {
      total: 0,
      data: [],
    };
  }
  // const tagIds = validCategories.reduce((acc, cid) => {
  //   if (query.categoryIds[cid].tagIds) {
  //     return acc.concat([query.categoryIds[cid].tagIds]);
  //   }
  //   return acc;
  // }, []);
  // const categories = [validCategories, tagIds].join(',');
  try {
    const resp = await searchEvent({
      text: query.term,
      lon: query.longitude,
      lat: query.latitude,
      radius: query.radius || 'smart',
      order: query.startDate ? 'time' : 'best',
      end_date_range: query.endDate
        ? format(new Date(query.endDate), ' YYYY-MM-DDTHH:MM:SS')
        : null,
      start_date_range: query.startDate
        ? format(new Date(query.startDate), ' YYYY-MM-DDTHH:MM:SS')
        : null,
    });

    if (!resp.events.length) {
      return {
        total: 0,
        data: [],
      };
    }

    const data: HourlySearch.SearchItem[] = resp.events.map((item) => ({
      id: item.id,
      title: item.name,
      imageUrl: item?.featured_photo?.photo_link,
      url: item.link,
      provider: {
        name: 'TicketMaster',
        // logoUrl: '',
      },
      location: {
        lat: item.venue.lat,
        long: item.venue.lon,
      },
      distance: {
        unit: 'KM',
        value: 0, // TODO: Calculate it
      },
      date: {
        start: item.local_date,
        end: 'item.dates.end.localDate',
      },
      venue: item?.venue
        ? {
            name: item.venue.name,
            address: item.venue.address_1,
          }
        : null,
    }));

    return {
      total: resp.events.length,
      data,
    };
  } catch (e) {
    console.error(e);
    return {
      total: 0,
      data: [],
    };
  }
};

export default search;
