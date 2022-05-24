import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserSessionsService } from './user-sessions.service';

@Module({
  providers: [UserSessionsService, ConfigService, PrismaService],
  exports: [UserSessionsService],
})
export class UserSessionsModule {}
