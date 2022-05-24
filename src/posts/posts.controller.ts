import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt.guard';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ListPostsDto } from './dto/list-post.dto';

@ApiTags('Posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Req() req, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(req.user.id, createPostDto);
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, req.user.id, updatePostDto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.postsService.remove(req.user.id, id);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.postsService.findOne(id, req.user.id);
  }

  @Get()
  findAll(@Req() req, @Query() query: ListPostsDto) {
    return this.postsService.find(req.user.id, query);
  }

  @Get('/:id')
  findOthersPost(
    @Req() req,
    @Param('id') id: string,
    @Query() query: ListPostsDto,
  ) {
    return this.postsService.find(id, query);
  }
}
