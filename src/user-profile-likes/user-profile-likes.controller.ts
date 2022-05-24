import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
  UnprocessableEntityException,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from './../auth/jwt.guard';

import { UserProfileLikesService } from './user-profile-likes.service';

import { ListUserProfileLikeDto } from './dto/list-user-profile-like.dto';
import {
  UserProfileLikeSummaryEntity,
  UserProfileLikeEntity,
} from './entities/user-profile-like.entity';

@ApiTags('User Profile Likes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user/:userId/profile')
export class UserProfileLikesController {
  constructor(
    private readonly userProfileLikesService: UserProfileLikesService,
  ) {}

  @Post('likes')
  @ApiResponse({
    status: 201,
    type: UserProfileLikeEntity,
    description:
      'For logged in user to like a user profile mentioned by userId.',
  })
  create(@Req() req, @Param('userId') userId: string) {
    if (req.user.id === userId) {
      throw new UnprocessableEntityException();
    }
    return this.userProfileLikesService.create({
      likedId: userId,
      likedById: req.user.id,
    });
  }

  @Get('likes/summary')
  @ApiResponse({
    status: 200,
    type: UserProfileLikeSummaryEntity,
    description: 'To get the summary of likes on user mentioned by userId',
  })
  summary(
    @Req() req,
    @Param('userId') userId: string,
  ): Promise<UserProfileLikeSummaryEntity> {
    if (req.user.id !== userId && req.user.isPrivate) {
      throw new UnauthorizedException();
    }
    return this.userProfileLikesService.summary({
      userId,
    });
  }

  @Get('likes')
  @ApiResponse({
    status: 200,
    type: [UserProfileLikeEntity],
    description: 'To get the list of likes on user mentioned by userId',
  })
  findAll(
    @Req() req,
    @Param('userId') userId: string,
    @Query() query: ListUserProfileLikeDto,
  ): Promise<UserProfileLikeEntity[]> {
    if (req.user.id !== userId && req.user.isPrivate) {
      throw new UnauthorizedException();
    }
    return this.userProfileLikesService.findAllOnUser({
      userId,
      limit: +query.limit,
      offset: +query.offset,
    });
  }

  @Delete('likes/:userProfileLikeId')
  @ApiResponse({
    status: 201,
    type: UserProfileLikeEntity,
    description:
      'For logged in user to remove the like on user profile mentioned by userId.',
  })
  remove(@Req() req, @Param('userProfileLikeId') id: string) {
    return this.userProfileLikesService.remove(id, req.user.id);
  }

  @Get('liked')
  @ApiResponse({
    status: 200,
    type: [UserProfileLikeEntity],
    description: 'To get the list of profile liked by me',
  })
  findLiked(
    @Req() req,
    @Param('userId') userId: string,
    @Query() query: ListUserProfileLikeDto,
  ): Promise<UserProfileLikeEntity[]> {
    if (req.user.id !== userId) {
      throw new UnauthorizedException();
    }
    return this.userProfileLikesService.findAllByUser({
      userId,
      limit: +query.limit,
      offset: +query.offset,
    });
  }
}
