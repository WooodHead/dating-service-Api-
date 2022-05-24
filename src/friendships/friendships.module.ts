import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { UserNotificationsModule } from '../user-notifications/user-notifications.module';

import { FriendshipsService } from './friendships.service';
import { FriendshipsController } from './friendships.controller';

@Module({
  imports: [UserNotificationsModule],
  controllers: [FriendshipsController],
  providers: [FriendshipsService, PrismaService],
  exports: [FriendshipsService],
})
export class FriendshipsModule {}
