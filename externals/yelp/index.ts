import fetch from 'node-fetch';
import * as QS from 'query-string';
import { HourlySearch } from 'types/search';
import { transformMeterDistance } from 'externals/utils';

import * as configs from './configs';
import { Yelp } from './types';

const fetchYelp = async (args: {
  url: string;
  query?: Record<string, any>;
}) => {
  const query = QS.stringify(args.query || {});
  return fetch(`${configs.YELP_BASE_URL}${args.url}?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
  });
};

export const searchBusiness = async (
  query: Yelp.BusinessSearchAPIPayload,
): Promise<Yelp.BusinessSearchAPIResponse> => {
  const resp = await fetchYelp({
    url: '/businesses/search',
    query,
  });
  const data = await resp.json();
  return data as Yelp.BusinessSearchAPIResponse;
};

export const getBusinessDetail = async (
  params: Yelp.BusinessDetailAPIPayload,
): Promise<Yelp.BusinessDetailAPIResponse> => {
  const resp = await fetchYelp({ url: `/businesses/${params.id}` });
  const data = await resp.json();
  return data as Yelp.BusinessDetailAPIResponse;
};

const getValidCategories = (query: HourlySearch.Options): string[] => {
  if (!query?.categoryIds) {
    return [];
  }
  return Object.keys(query.categoryIds).filter((cid) =>
    configs.validCategories.includes(cid as any),
  );
};

const shouldSearch = (query: HourlySearch.Options): boolean => {
  if (!query?.categoryIds) {
    return true;
  }
  return getValidCategories(query).length > 0;
};

const transform = (
  business: Yelp.BusinessItem,
): HourlySearch.Response['data'][0] => ({
  id: business.id,
  title: business.name,
  imageUrl: business.image_url,
  url: business.url,
  provider: {
    name: 'Yelp',
    // logoUrl: 'https://www.yelp.com/favicon.ico',
  },
  distance: transformMeterDistance(business.distance),
  location: {
    lat: business.coordinates.latitude,
    long: business.coordinates.longitude,
  },
  rating: {
    value: business.rating.toString(),
    count: business.review_count,
  },
  tags: business.categories.map((c) => ({
    id: c.alias,
    name: c.title,
  })),
  priceValue: business.price,
  hours: business.hours?.map((h) => ({
    open: h.open.map((o) => ({
      isOvernight: o.is_overnight,
      start: o.start,
      end: o.end,
      day: o.day,
    })),
    isOpenNow: h.is_open_now,
  })),
});

export const search = async (
  query: HourlySearch.Options,
): Promise<HourlySearch.Response> => {
  if (!shouldSearch(query)) {
    return {
      total: 0,
      data: [],
    };
  }
  try {
    const validCategories = getValidCategories(query);

    const tagIds = validCategories.reduce((acc, cid) => {
      if (query.categoryIds[cid].tagIds) {
        return acc.concat([query.categoryIds[cid].tagIds]);
      }
      return acc.concat([cid]);
    }, []);

    const categories = [...tagIds].join(',');
    const resp = await searchBusiness({
      limit: query.limit,
      offset: query.offset,
      latitude: query.latitude,
      longitude: query.longitude,
      term: query.term,
      categories,
      sort_by: query.term ? 'best_match' : 'distance',
    });

    if (!(resp?.businesses?.length > 0)) {
      return {
        total: 0,
        data: [],
      };
    }

    const data: HourlySearch.SearchItem[] = resp.businesses.map(transform);

    return {
      total: resp.total,
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

export const details = async (params: {
  id: string;
}): Promise<HourlySearch.Response['data'][0]> => {
  const resp = await getBusinessDetail({ id: params.id });
  return transform(resp);
};

export default search;
