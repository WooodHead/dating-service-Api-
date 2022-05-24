import { UserLocationsModule } from './user-locations/user-locations.module';
import { PostsModule } from './posts/posts.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserSessionsModule } from './user-sessions/user-sessions.module';
import { UserProfileLikesModule } from './user-profile-likes/user-profile-likes.module';
import { RefreshCountsModule } from './refresh-counts/refresh-counts.module';

import { ProfileViewsModule } from './profile-views/profile-views.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicsModule } from './topics/topics.module';
import { UserQuotesModule } from './user-quotes/user-quotes.module';
import { UserBlocksModule } from './user-blocks/user-blocks.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 60 * 24, // 1 day
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    UserSessionsModule,
    UserProfileLikesModule,
    UserBlocksModule,
    AttachmentsModule,
    PostsModule,
    ProfileViewsModule,
    UserLocationsModule,
    RefreshCountsModule,
    TopicsModule,
    UserQuotesModule,
    ProfileViewsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
