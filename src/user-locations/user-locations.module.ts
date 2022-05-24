/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { UserLocationsService } from './user-locations.service';
import { UserLocationsController } from './user-locations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema}
    ])
  ],
  controllers: [UserLocationsController],
  providers: [UserLocationsService],
  exports: [UserLocationsService]
})
export class UserLocationsModule {}
