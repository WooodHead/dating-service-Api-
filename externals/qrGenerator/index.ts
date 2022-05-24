/* eslint-disable @typescript-eslint/no-var-requires */
import { v4 as uuid } from 'uuid';

import * as configs from './configs';

const QRCode = require('qrcode');

export async function generateQRBase64(text: string): Promise<string> {
  try {
    const base64 = await QRCode.toDataURL(text);
    return base64;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function generateQRFile(text: string): Promise<{
  path: string;
}> {
  try {
    const path = `${configs.FILE_GENERATION_PATH}/${uuid()}.${
      configs.FILE_GENERATION_FORMAT
    }`;
    await QRCode.toFile(path, text, {
      type: configs.FILE_GENERATION_FORMAT,
    });
    return { path };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
