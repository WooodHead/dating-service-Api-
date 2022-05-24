import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { UserBlocksService } from './user-blocks.service';
import { UserBlocksController } from './user-blocks.controller';
import { FriendshipsModule } from '../friendships/friendships.module';

@Module({
  imports: [FriendshipsModule],
  controllers: [UserBlocksController],
  providers: [UserBlocksService, PrismaService],
})
export class UserBlocksModule {}
