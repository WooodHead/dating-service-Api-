import fetch from 'node-fetch';
import * as QS from 'query-string';
import { HourlySearch } from 'types/search';
import { transformMilesDistance } from 'externals/utils';

import * as configs from './configs';
import { TicketMaster } from './types';

const fetchTicketMaster = async (args: {
  url: string;
  query?: Record<string, any>;
}) => {
  const query = QS.stringify(
    {
      unit: 'miles',
      ...(args.query || {}),
      apikey: process.env.TICKET_MASTER_API_KEY,
    },
    {
      arrayFormat: 'index',
    },
  );
  console.log(`${configs.TICKET_MASTER_BASE_URL}${args.url}?${query}`);
  return fetch(`${configs.TICKET_MASTER_BASE_URL}${args.url}?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const searchEvent = async (
  query: TicketMaster.EventSearchAPIPayload,
): Promise<TicketMaster.EventSearchAPIResponse> => {
  const resp = await fetchTicketMaster({
    url: '/discovery/v2/events',
    query: { ...query, unit: 'miles' },
  });
  const data = await resp.json();
  return data as TicketMaster.EventSearchAPIResponse;
};

export const getEventDetail = async (
  params: TicketMaster.EventDetailAPIPayload,
): Promise<TicketMaster.EventDetailAPIResponse> => {
  const resp = await fetchTicketMaster({
    url: `/discovery/v2/events/${params.id}`,
  });
  const data = await resp.json();
  return data as TicketMaster.EventDetailAPIResponse;
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
  try {
    const classificationId = validCategories.reduce((acc, cid) => {
      if (query.categoryIds[cid].tagIds) {
        return acc.concat([...query.categoryIds[cid].tagIds]);
      }
      return acc.concat([query.categoryIds[cid].providerReferenceId]);
    }, []);
    const resp = await searchEvent({
      page: query.offset * query.limit,
      size: query.limit,
      keyword: query.term,
      latlong: `${query.latitude},${query.longitude}`,
      sort: 'distance,date,asc',
      startDateTime: query.startDate,
      endDateTime: query.endDate,
      classificationId,
    });

    if (!resp?._embedded?.events?.length || resp.errors) {
      return {
        total: 0,
        data: [],
      };
    }

    const data: HourlySearch.SearchItem[] = resp._embedded.events.map(
      (item) => ({
        id: item.id,
        title: item.name,
        description: item.description,
        imageUrl:
          item?.images?.find?.((img) => !img.fallback && img.ratio === '3_2')
            ?.url || 'N/A',
        url: item.url,
        provider: {
          name: 'TicketMaster',
          // logoUrl: '',
        },
        tags: item.classifications?.[0]?.genre
          ? [
              {
                id: item.classifications[0].genre.id,
                name: item.classifications[0].genre.name,
              },
            ]
          : undefined,
        location: {
          lat: item?._embedded.venues?.[0]?.location.latitude,
          long: item?._embedded.venues?.[0]?.location.longitude,
        },
        distance: transformMilesDistance(item.distance),
        date:
          item?.dates?.start || item?.dates?.end
            ? {
                start: item.dates?.start?.dateTime || 'N/A',
                end: item.dates?.end?.dateTime || 'N/A',
              }
            : undefined,
        venue: item?._embedded.venues?.[0]
          ? {
              name: item?._embedded.venues?.[0]?.name,
              address: item?._embedded.venues?.[0]?.address?.line1,
            }
          : null,
      }),
    );

    return {
      total: resp.page.totalElements,
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
