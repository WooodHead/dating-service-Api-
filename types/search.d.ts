import { SearchDto } from 'src/search/dto/search.dto';

export namespace HourlySearch {
  export interface Options extends SearchDto {
    categoryIds: any;
    term: string;
    startDate: any;
    endDate: any;
    /** The search query */
    // query?: string;

    /** The time period to search over */
    // startDate?: string;
    // endDate?: string;

    /** The maximum number of results to return */
    limit: number;
    /** The number of results to skip */
    offset: number;

    // /** The categories of results to return */
    // categoryIds?: Record<
    //   string,
    //   {
    //     providerReferenceId: string;
    //     tagIds?: string[];
    //   }
    // >;

    /** The location of the results */
    latitude: number;
    longitude: number;
    radius: number;
  }

  interface SearchItem {
    id: string;
    title: string;
    imageUrl: string;
    url: string;
    location: {
      lat: number;
      long: number;
    };
    distance: {
      unit: string;
      value: number;
    };
    provider: {
      name: string;
      logoUrl?: string;
    };
    date?: {
      start: string;
      end: string;
    };
    venue?: {
      name: string;
      address: string;
    };
    rating?: {
      value: string;
      count: number;
    };
    tags?: {
      id: string;
      name: string;
    }[];
    priceValue?: string;
    hours?: {
      open: {
        isOvernight: boolean;
        start: string;
        end: string;
        day: number;
      }[];
      isOpenNow: boolean;
    }[];
  }

  export interface Response {
    data: SearchItem[];
    total: number;
  }
}
