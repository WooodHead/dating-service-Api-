export declare namespace Meetup {
  interface City {
    id: number;
    city: string;
    lat: number;
    lon: number;
    state: string;
    country: string;
    zip: string;
    member_count: number;
  }

  interface Event {
    created: number;
    duration: number;
    id: string;
    name: string;
    date_in_series_pattern: boolean;
    status:
      | 'cancelled'
      | 'upcoming'
      | 'past'
      | 'proposed'
      | 'suggested'
      | 'draft';
    time: number;
    local_date: string;
    local_time: string;
    updated: number;
    utc_offset: number;
    waitlist_count: number;
    yes_rsvp_count: number;
    venue: Venue;
    is_online_event: boolean;
    group: Group;
    link: string;
    visibility: string;
    member_pay_fee: boolean;
    featured_photo: {
      base_url: string;
      highres_link: string;
      id: number;
      photo_link: string;
      thumb_link: string;
      type: 'event' | member;
    };
    plain_text_description: string;
  }

  interface Group {
    created: number;
    name: string;
    id: number;
    join_mode: string;
    lat: number;
    lon: number;
    urlname: string;
    who: string;
    localized_location: string;
    state: string;
    country: string;
    region: string;
    timezone: string;
  }

  interface Venue {
    id: number;
    name: string;
    lat: number;
    lon: number;
    repinned: boolean;
    address_1: string;
    city: string;
    country: string;
    localized_country_name: string;
    zip: string;
    state: string;
  }

  type EventSearchAPIPayload = {
    end_date_range?: string;
    end_time_range?: string;
    start_date_range?: string;
    start_time_range?: string;
    text: string;
    lon: number;
    lat: number;
    radius?: number | 'global' | 'smart';
    order?: 'best' | 'time';
    topic_category?: string;
    fields?: string[];
  };

  type EventSearchAPIResponse = {
    city: City;
    events: Event[];
  };

  type EventDetailAPIPayload = {
    id: string;
  };

  type EventDetailAPIResponse = Event;
}
