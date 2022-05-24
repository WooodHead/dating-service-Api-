import { HourlyFilters } from 'data/filter';

export const TICKET_MASTER_BASE_URL = 'https://app.ticketmaster.com';

export const validCategories: Array<keyof typeof HourlyFilters['categories']> =
  ['concerts', 'sports', 'film', 'art'];

// export const validTags: Array<keyof typeof HourlyFilters['tags']> = [
//   'party',
//   'festival',
//   'gala',
// ];
