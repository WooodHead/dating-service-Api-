import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';

import { BullModule } from '@nestjs/bull';

import { UserNotificationsService } from './user-notifications.service';
import { UserNotificationsController } from './user-notifications.controller';

import { USER_NOTIFICATIONS_QUEUE_NAME } from './user-notifications.constants';
import { UserNotificationsProcessor } from './user-notifications.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: USER_NOTIFICATIONS_QUEUE_NAME,
    }),
  ],
  controllers: [UserNotificationsController],
  providers: [
    UserNotificationsService,
    UserNotificationsProcessor,
    PrismaService,
  ],
  exports: [UserNotificationsService],
})
export class UserNotificationsModule {}
