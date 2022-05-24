import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshCountsController } from './refresh-counts.controller';
import { RefreshCountsService } from './refresh-counts.service';

@Module({
  controllers: [RefreshCountsController],
  providers: [RefreshCountsService, PrismaService],
})
export class RefreshCountsModule {}
