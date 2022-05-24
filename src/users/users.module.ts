import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { MulterExtendedModule } from 'nestjs-multer-extended';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [PostsModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
