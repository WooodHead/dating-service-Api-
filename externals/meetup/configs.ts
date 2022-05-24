import { HourlyFilters } from 'data/filter';

export const MEETUP_BASE_URL = 'https://api.meetup.com';

export const validCategories: Array<keyof typeof HourlyFilters['categories']> =
  [];

// export const validTags: Array<keyof typeof HourlyFilters['tags']> = [];
