import { HourlyFilters } from 'data/filter';

export const YELP_BASE_URL = 'https://api.yelp.com/v3';

export const validCategories: Array<keyof typeof HourlyFilters['categories']> =
  ['restaurants', 'bars', 'food', 'clubs', 'festivals', 'hiking'];
