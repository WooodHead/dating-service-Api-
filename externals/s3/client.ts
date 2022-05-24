import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

let s3Client: S3Client;

export async function getS3ObjectUrl(args: {
  bucket?: string;
  key: string;
}): Promise<string> {
  const endpoint = await getS3Client().config.endpoint();
  return `${endpoint.protocol}//${endpoint.hostname}${endpoint.path}${args.bucket}/${args.key}`;
}

export function getS3Client(): S3Client {
  if (!s3Client) {
    const S3_CONFIGS: S3ClientConfig = {
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
      },
      region: process.env.AWS_S3_REGION,
    };
    s3Client = new S3Client(S3_CONFIGS);
  }
  return s3Client;
}
