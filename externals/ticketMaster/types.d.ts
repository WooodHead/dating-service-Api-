export declare namespace TicketMaster {
  type ImageItem = {
    url: string;
    ratio: '16_9' | '3_2' | '4_3';
    fallback: boolean;
    attribution: string;
  };

  type VenueItem = {
    location: {
      latitude: number;
      longitude: number;
    };
    name: string;
    type: 'venue';
    id: string;
    test: boolean;
    aliases: string[];
    images: ImageItem[];
    distance: number;
    units: string;
    postalCode: string;
    timezone: string;
    city: {
      name: string;
    };
    state: {
      name: string;
      stateCode: string;
    };
    country: {
      name: string;
      countryCode: string;
    };
    address: {
      line1: string;
    };
  };

  type EventItem = {
    id: string;
    name: string;
    description: string;
    additionalInfo: string;
    url: string;
    images: {
      url: string;
      ratio: '16_9' | '3_2' | '4_3';
      fallback: boolean;
      attribution: string;
    }[];
    distance: number;
    units: string;
    classifications: {
      genre?: {
        id: string;
        name: string;
      };
    }[];
    dates: {
      start: {
        localDate: string;
        localTime: Record<string, unknown>;
        dateTime: string;
        dateTBD: boolean;
        dateTBA: boolean;
        timeTBA: boolean;
        noSpecificTime: boolean;
      };
      end: {
        localDate: string;
        localTime: Record<string, unknown>;
        dateTime: string;
        approximate: boolean;
        noSpecificTime: boolean;
      };
      status: {
        code: 'onsale' | 'offsale' | 'canceled' | 'postponed' | 'rescheduled';
      };
      spanMultipleDays: boolean;
      access: {
        startDateTime: string;
        startApproximate: boolean;
        endDateTime: string;
        endApproximate: boolean;
      };
      timezone: string;
    };
    priceRanges: {
      type: 'standard';
      currency: string;
      min: number;
      max: number;
    }[];
    seatMap: {
      staticUrl: string;
    };
    _embedded: {
      venues: VenueItem[];
    };
  };

  type EventSearchAPIPayload = {
    size: number;
    page: number;
    latlong: string;
    radius?: string;
    keyword?: string;
    sort:
      | 'name,asc'
      | 'name,desc'
      | 'date,asc'
      | 'date,desc'
      | 'relevance,asc'
      | 'relevance,desc'
      | 'distance,asc'
      | 'name,date,asc'
      | 'name,date,desc'
      | 'date,name,asc'
      | 'date,name,desc'
      | 'distance,date,asc'
      | 'onSaleStartDate,asc'
      | 'id,asc'
      | 'venueName,asc'
      | 'venueName,desc'
      | 'random';
    genreId?: string[];
    subGenreId?: string[];
    typeId?: string[];
    subTypeId?: string[];
    classificationId?: string[];
    startDateTime?: string;
    endDateTime?: string;
  };

  type EventSearchAPIResponse = {
    _embedded: {
      events: EventItem[];
    };
    page: {
      size: number;
      totalElements: number;
      totalPages: number;
      number: number;
    };
    errors?: Record<string, unknown>[];
  };

  type EventDetailAPIPayload = {
    id: string;
  };

  type EventDetailAPIResponse = EventItem;
}
