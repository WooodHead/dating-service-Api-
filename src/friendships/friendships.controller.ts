import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt.guard';

import { FriendshipsService } from './friendships.service';

// import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { ListFriendshipDto } from './dto/list-friendship.dto';

@ApiTags('Friendships')
@UseGuards(JwtAuthGuard)
@Controller('friends')
export class FriendshipsController {
  constructor(private readonly friendshipsService: FriendshipsService) {}

  // @Post()
  // create(@Body() createFriendshipDto: CreateFriendshipDto) {
  //   return this.friendshipsService.create(createFriendshipDto);
  // }

  @Get()
  findAllOfSelf(@Req() req: any, @Query() query: ListFriendshipDto) {
    return this.friendshipsService.findAllOfSelf(req.user.id, query);
  }

  @Get(':userId')
  findOne(
    @Req() req: any,
    @Param('userId') userId: string,
    @Query() query: ListFriendshipDto,
  ) {
    return this.friendshipsService.findAllOfUser(req.user.id, userId, query);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.friendshipsService.remove(id, req.user.id);
  }
}
