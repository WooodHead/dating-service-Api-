import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';

@Module({
  controllers: [TopicsController],
  providers: [TopicsService, PrismaService,],
})
export class TopicsModule {}
