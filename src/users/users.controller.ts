import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ListPostsDto } from '../posts/dto/list-post.dto';
import { PostsService } from '../posts/posts.service';

import { JwtAuthGuard } from './../auth/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  @Get('profile')
  async getProfile(@Request() req) {
    const profile = await this.usersService.findOne({
      id: req.user.id,
      phoneNumber: req.user.phoneNumber,
    });
    if (!profile?.id) {
      throw new UnauthorizedException();
    }
    const profilePictures = await this.postsService.find(req.user.id);
    return { profile, profilePictures };
  }

  @Get('profile/:id')
  async getUserProfile(
    @Request() req,
    @Param('id') id: string,
    @Query() query: ListPostsDto,
  ) {
    const profile = await this.usersService.findUser({
      requestUserId: req.user.id,
      id,
    });

    if (!profile?.id) {
      throw new UnauthorizedException();
    }

    const profilePictures = await this.postsService.find(id, query);

    return { profile, profilePictures };
  }

  @Post('profile')
  async updateProfile(@Request() req, @Body() body: UpdateUserDto) {
    const profile = await this.usersService.update(req.user.id, body);
    return profile;
  }
}
