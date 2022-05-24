import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { ProfileViewsService } from './profile-views.service';
import { ProfileViewsController } from './profile-views.controller';

@Module({
  controllers: [ProfileViewsController],
  providers: [ProfileViewsService, PrismaService],
})
export class ProfileViewsModule {}
