export declare namespace Yelp {
  type BusinessItem = {
    id: string;
    alias: string;
    name: string;
    image_url: string;
    is_closed: boolean;
    url: string;
    review_count: number;
    categories: {
      alias: string;
      title: string;
    }[];
    rating: number;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    price: string;
    location: {
      address1: string;
      address2?: string;
      address3?: string;
      city: string;
      zip_code: string;
      country: string;
      state: string;
      display_address: string[];
    };
    phone: string;
    display_phone: string;
    distance: number;
    hours?: {
      open: {
        day: number;
        start: string;
        end: string;
        is_overnight: boolean;
      }[];
      is_open_now: boolean;
    }[];
  };

  type BusinessSearchAPIPayload = {
    limit: string | number;
    offset: string | number;
    latitude: string | number;
    longitude: string | number;
    location?: string;
    term?: string;
    categories?: string;
    sort_by?: 'best_match' | 'rating' | 'review_count' | 'distance';
  };

  type BusinessSearchAPIResponse = {
    businesses: BusinessItem[];
    total: number;
    region: {
      center?: {
        latitude: number;
        longitude: number;
      };
    };
  };

  type BusinessDetailAPIPayload = {
    id: string;
  };

  type BusinessDetailAPIResponse = BusinessItem;
}
