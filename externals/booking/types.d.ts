export declare namespace Booking {
  type HotelItem = {
    accommodation_type_name: string;
    longitude: number;
    unit_configuration_label: string;
    cc1: string;
    review_nr: number;
    hotel_id: number;
    wishlist_count: number;
    is_mobile_deal: number;
    is_city_center: number;
    url: string;
    review_recommendation: string;
    city_trans: string;
    city_in_trans: string;
    min_total_price: number;
    checkin: Check;
    district: string;
    hotel_include_breakfast: number;
    price_breakdown: PriceBreakdownClass;
    hotel_facilities: string;
    districts: string;
    cc_required: number;
    is_free_cancellable: number;
    distance_to_cc: string;
    is_genius_deal: number;
    class_is_estimated: number;
    soldout: number;
    address_trans: string;
    district_id: number;
    default_language: string;
    cant_book: null;
    zip: string;
    countrycode: string;
    checkout: Check;
    review_score_word: string;
    address: string;
    preferred_plus: number;
    default_wishlist_name: string;
    is_smart_deal: number;
    city_name_en: string;
    currencycode: Currency;
    children_not_allowed: null;
    timezone: string;
    badges: Badge[];
    ufi: number;
    id: string;
    hotel_name_trans: string;
    review_score: number;
    latitude: number;
    is_beach_front: number;
    hotel_has_vb_boost: number;
    block_ids: string[];
    accommodation_type: number;
    country_trans: string;
    bwallet: Bwallet;
    is_wholesaler_candidate: number;
    composite_price_breakdown: PriceBreakdown;
    mobile_discount_percentage: number;
    in_best_district: number;
    selected_review_topic: null;
    currency_code: Currency;
    distances: Distance[];
    distance: string;
    type: string;
    main_photo_url: string;
    is_geo_rate: string;
    class: number;
    hotel_name: string;
    is_no_prepayment_block: number;
    price_is_final: number;
    preferred: number;
    extended: number;
    main_photo_id: number;
    genius_discount_percentage: number;
    city: string;
    max_photo_url: string;
    max_1440_photo_url: string;
  };

  type Badge = {
    text: string;
    id: string;
    badge_variant: string;
  };

  type Bwallet = {
    hotel_eligibility: number;
  };

  type Check = {
    until: string;
    from: string;
  };

  type PriceBreakdown = {
    benefits: Benefit[];
    gross_amount: AllInclusiveAmount;
    all_inclusive_amount: AllInclusiveAmount;
    discounted_amount: AllInclusiveAmount;
    excluded_amount: AllInclusiveAmount;
    included_taxes_and_charges_amount: AllInclusiveAmount;
    product_price_breakdowns?: PriceBreakdown[];
    items: Item[];
    strikethrough_amount: AllInclusiveAmount;
    gross_amount_per_night: AllInclusiveAmount;
    strikethrough_amount_per_night: AllInclusiveAmount;
    net_amount: AllInclusiveAmount;
  };

  type AllInclusiveAmount = {
    value: number;
    currency: Currency;
  };

  export enum Currency {
    Usd = 'USD',
  }

  type Benefit = {
    details: string;
    kind: string;
    identifier: string;
    icon: null;
    badge_variant: string;
    name: string;
  };

  type Item = {
    item_amount: AllInclusiveAmount;
    inclusion_type?: string;
    name: string;
    base: Base;
    details: string;
    kind: string;
    identifier?: string;
  };

  type Base = {
    kind: string;
    percentage?: number;
    base_amount?: number;
  };

  type Distance = {
    text: string;
    icon_name: string;
    icon_set: null;
  };

  type PriceBreakdownClass = {
    gross_price: string;
    has_incalculable_charges: number;
    has_fine_print_charges: number;
    all_inclusive_price: number;
    sum_excluded_raw: string;
    has_tax_exceptions: number;
    currency: Currency;
  };

  type HotelSearchAPIPayload = {
    order_by: string;
    room_number: string;
    filter_by_currency: string;
    adults_number: string;
    locale: string;
    latitude: string;
    longitude: string;
    units: string;
    page_number: string;
    checkin_date: string;
    checkout_date: string;
    include_adjacency?: string;
    children_number?: string;
    children_ages?: string;
  };

  type HotelSearchAPIResponse = {
    result: HotelItem[];
    count: number;
    primary_count: number;
    map_bounding_box: {
      ne_long: number;
      sw_long: number;
      ne_lat: number;
      sw_lat: number;
    };
  };

  type HotelDetailAPIPayload = {
    id: string;
  };

  type HotelDetailAPIResponse = HotelItem;
}
