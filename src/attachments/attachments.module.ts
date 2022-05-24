import { PrismaService } from './../prisma/prisma.service';

import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterExtendedModule } from 'nestjs-multer-extended';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';

@Module({
  imports: [
    MulterExtendedModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        awsConfig: {
          accessKeyId: config.get('AWS_S3_ACCESS_KEY'),
          secretAccessKey: config.get('AWS_S3_SECRET_KEY'),
          region: config.get('AWS_S3_REGION'),
        },
        bucket: config.get('AWS_S3_BUCKET_NAME'),
        basePath: 'posts/attachments',
        fileSize: 2 * 1024 * 1024,
        logger: new Logger('FileUpload'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AttachmentsController],
  providers: [PrismaService, AttachmentsService],
})
export class AttachmentsModule {}
