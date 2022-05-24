import { Module } from '@nestjs/common';

import { UserProfileLikesService } from './user-profile-likes.service';
import { UserProfileLikesController } from './user-profile-likes.controller';
import { PrismaService } from './../prisma/prisma.service';

import { UserNotificationsModule } from './../user-notifications/user-notifications.module';

@Module({
  imports: [UserNotificationsModule],
  controllers: [UserProfileLikesController],
  providers: [UserProfileLikesService, PrismaService],
})
export class UserProfileLikesModule {}
