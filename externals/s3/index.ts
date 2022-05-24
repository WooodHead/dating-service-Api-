import { PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';

import { getS3Client, getS3ObjectUrl } from './client';

type TS3Buckets = 'event_qr' | 'event_image';

export const uploadBase64Image = async ({
  base64,
  directory,
}: {
  base64: string;
  directory: TS3Buckets;
}) => {
  try {
    const base64Data = Buffer.from(
      base64.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    const extension = base64.split(';')[0].split('/')[1];
    const Key = `${directory}/${uuid()}.${extension}`;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Body: base64Data,
      Key,
      ContentType: `image/${extension}`,
      ContentEncoding: 'base64',
      ACL: 'public-read',
    });
    await getS3Client().send(command);
    const imageUrl = await getS3ObjectUrl({
      bucket: process.env.AWS_S3_BUCKET_NAME,
      key: Key,
    });
    return { imageUrl };
  } catch (e) {
    console.warn(e);
    throw e;
  }
};
