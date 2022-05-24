import fetch from 'node-fetch';

import { Sendy_BASE_URL } from './configs';
import { Sendy } from './types';

const fetchSendy = async (args: {
  url: string;
  body: Record<string, unknown>;
}) => {
  return fetch(`${Sendy_BASE_URL}${args.url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.Sendy_API_KEY}`,
    },
    body: args.body,
  });
};

export const sendMail = async (
  body: Sendy.EmailSendAPIPayload,
): Promise<Sendy.EmailSendAPIResponse> => {
  const resp = await fetchSendy({
    url: '/send',
    body,
  });
  const data = await resp.json();
  return data as Sendy.EmailSendAPIResponse;
};

export const createMailList = async (
  body: Sendy.MailListAPIPayload,
): Promise<Sendy.MailListAPIResponse> => {
  const resp = await fetchSendy({
    url: '/campaign/create',
    body,
  });
  const data = await resp.json();
  return data as Sendy.MailListAPIResponse;
};
