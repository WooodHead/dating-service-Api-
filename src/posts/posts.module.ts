import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PostsController],
  providers: [PrismaService, PostsService],
  exports: [PostsService],
})
export class PostsModule {}
