import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserLocationsModule } from '../user-locations/user-locations.module';
import { UsersModule } from '../users/users.module';
import { UserQuotesController } from './user-quotes.controller';
import { UserQuotesService } from './user-quotes.service';


@Module({
  imports:[UserLocationsModule, UsersModule],
  controllers: [UserQuotesController],
  providers: [UserQuotesService, PrismaService,],
})
export class UserQuotesModule {}
