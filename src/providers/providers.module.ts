import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';

import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';

@Module({
  controllers: [ProvidersController],
  providers: [ProvidersService, PrismaService],
})
export class ProvidersModule {}
